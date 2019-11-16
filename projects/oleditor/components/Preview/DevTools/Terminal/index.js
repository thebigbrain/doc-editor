import React from 'react';
import { withTheme } from 'styled-components';
import { listen } from 'codesandbox-api';
import uuid from 'uuid';
import { PlusIcon } from '@muggle/icons';
import './styles.css';
import { Shell } from './Shell';
import { TerminalComponent } from './Shell/Term';
import { ShellTabs } from './ShellTabs';
// Incredibly hacky way of letting the StatusBar access the state of the component.
// In the future we need to abstract this away to the global state and dispatch an event.
// We need to keep all the tabs in the global state and work from there.
let createShell;

class DevToolTerminal extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      shells: [],
      selectedShell: undefined,
    };
    this.setTerminal = (terminal) => {
      this.term = terminal;
    };
    this.handleMessage = (data) => {
      if (data.type === 'terminal:message') {
        this.term.write(data.data);
        if (this.props.updateStatus) {
          this.props.updateStatus('info');
        }
      }
      else if (data.type === 'codesandbox:create-shell') {
        this.props.openDevTools();
        this.props.selectCurrentPane();
        this.createShell(data.script);
      }
    };
    this.createShell = (script) => {
      const newShell = {
        id: uuid.v4(),
        title: script ? `yarn ${script}` : '/bin/bash',
        script,
        ended: false,
      };
      this.setState(s => ({
        shells: [...s.shells, newShell],
        selectedShell: newShell.id,
      }));
    };
    this.selectShell = (shellId) => {
      this.setState({ selectedShell: shellId });
    };
    this.getShellIdLeftOfCurrentShell = () => {
      const { shells, selectedShell } = this.state;
      const currentIndex = shells.findIndex(s => s.id === selectedShell);
      const newShell = shells[currentIndex - 1];
      if (newShell) {
        return newShell.id;
      }
      return undefined;
    };
    this.closeShell = (shellId) => {
      this.setState(s => {
        const selectedShell = shellId === s.selectedShell
          ? this.getShellIdLeftOfCurrentShell()
          : s.selectedShell;
        return {
          selectedShell,
          shells: s.shells.filter(x => x.id !== shellId),
        };
      });
    };
    /**
     * End the shell itself, this means that we won't close the shell tab
     * but mark it as closed. This is done when the server kills the shell and
     * we still want to show output.
     */
    this.endShell = (shellId) => {
      this.setState(s => ({
        shells: s.shells.map(shell => shell.id === shellId ? { ...shell, ended: true } : shell),
      }));
    };
  }

  componentDidMount() {
    createShell = this.createShell;
    this.listener = listen(this.handleMessage);
  }

  componentWillUnmount() {
    createShell = undefined;
    this.listener();
  }

  render() {
    const { hidden, theme, owned } = this.props;
    const { selectedShell } = this.state;
    return (<div className="terminal">
      {!hidden && owned && (
        <ShellTabs selectedShell={this.state.selectedShell} shells={this.state.shells} selectShell={this.selectShell}
                   closeShell={this.closeShell} createShell={this.createShell}/>)}

      <div style={{ position: 'relative', flex: 'auto' }}>
        <TerminalComponent hidden={hidden || selectedShell !== undefined} theme={theme}
                           onTerminalInitialized={this.setTerminal}/>
        {this.state.shells.map(shell => (<Shell key={shell.id} id={shell.id} script={shell.script} ended={shell.ended}
                                                hidden={hidden || shell.id !== this.state.selectedShell}
                                                closeShell={() => this.closeShell(shell.id)}
                                                endShell={() => this.endShell(shell.id)}/>))}
      </div>
    </div>);
  }
}

export const terminal = {
  id: 'codesandbox.terminal',
  title: 'Terminal',
  Content: withTheme(DevToolTerminal),
  actions: ({ owned }) => [
    !owned && {
      title: 'Fork to add a terminal',
      onClick: () => {
        if (createShell && owned) {
          createShell();
        }
      },
      Icon: PlusIcon,
      disabled: !owned,
    },
  ].filter(Boolean),
};
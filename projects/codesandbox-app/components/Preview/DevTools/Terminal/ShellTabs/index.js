import React from 'react';
import { PlusIcon } from '@muggle/icons';
import { Container, CrossIcon, PlusContainer, Tab } from './elements';

export class ShellTabs extends React.PureComponent {
  render() {
    const { selectedShell, createShell, shells } = this.props;
    return (<Container>
      <Tab selected={selectedShell === undefined} onClick={() => this.props.selectShell(undefined)}>
        yarn start
      </Tab>
      {shells.map(shell => (
        <Tab selected={selectedShell === shell.id} key={shell.id} onClick={() => this.props.selectShell(shell.id)}>
          {shell.title}
          {shell.ended && ' (closed)'}

          <CrossIcon onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            this.props.closeShell(shell.id);
          }}/>
        </Tab>))}
      <PlusContainer onClick={() => createShell()}>
        <PlusIcon/>
      </PlusContainer>
    </Container>);
  }
}

import React from 'react';
import { withTheme } from 'styled-components';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import ResizeObserver from 'resize-observer-polyfill';
import getTerminalTheme from '../terminal-theme';


export class TerminalComponentNoTheme extends React.PureComponent {
  constructor() {
    super();
    this.startTerminal = () => {
      this.term = new Terminal({
        theme: getTerminalTheme(this.props.theme),
        fontFamily: 'Source Code Pro',
        fontWeight: 'normal',
        fontWeightBold: 'bold',
        lineHeight: 1.3,
        fontSize: 14,
      });
      this.fitAddon = new FitAddon();
      this.term.loadAddon(this.fitAddon);
      this.term.open(this.node);
      this.resizeTerminal();
      window.addEventListener('resize', this.listenForResize);
      this.props.onTerminalInitialized(this.term);
    };
    this.setupResizeObserver = (el) => {
      this.observer = new ResizeObserver(() => {
        clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => {
          this.resizeTerminal();
        }, 300);
      });
      this.observer.observe(el);
    };
    this.listenForResize = () => {
      this.resizeTerminal();
    };
    this.resizeTerminal = () => {
      this.fitAddon.fit();
    };
  }

  componentDidMount() {
    // Do this in a timeout so we can spawn the new tab, the perceived speed will
    // be faster because of this.
    setTimeout(this.startTerminal, 100);
  }

  componentDidUpdate(prevProps) {
    if (this.term) {
      if (prevProps.hidden !== this.props.hidden && !this.props.hidden) {
        this.term.focus();
      }
      if (JSON.stringify(prevProps.theme) !== JSON.stringify(this.props.theme)) {
        this.term.setOption('theme', getTerminalTheme(this.props.theme));
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listenForResize);
    if (this.term) {
      this.term.dispose();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    const { hidden } = this.props;
    return (<div style={{
      position: 'absolute',
      top: 8,
      bottom: 0,
      left: 8,
      right: 8,
      paddingBottom: 0,
      visibility: hidden ? 'hidden' : 'visible',
    }} ref={node => {
      if (node && !this.node) {
        this.node = node;
        this.setupResizeObserver(node);
      }
    }}/>);
  }
}

export const TerminalComponent = withTheme(TerminalComponentNoTheme);

import React from 'react';
import { dispatch, listen } from 'codesandbox-api';
import { withTheme } from 'styled-components';
import { debounce } from 'lodash-es';
import { TerminalComponent } from './Term';
class ShellComponent extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.initializeTerminal = (terminal) => {
            this.term = terminal;
            this.term.on('data', data => {
                if (!this.props.ended) {
                    dispatch({
                        type: 'socket:message',
                        channel: 'shell:in',
                        id: this.props.id,
                        data,
                    });
                }
            });
            this.listener = listen(this.handleMessage);
            this.sendResize = debounce(this.sendResize, 100);
            this.term.on('resize', ({ cols, rows }) => {
                this.sendResize(cols, rows);
            });
            dispatch({
                type: 'socket:message',
                channel: 'shell:start',
                id: this.props.id,
                cols: this.term.cols,
                rows: this.term.rows,
                script: this.props.script,
            });
            this.term.focus();
        };
        this.sendResize = (cols, rows) => {
            if (!this.props.ended) {
                dispatch({
                    type: 'socket:message',
                    channel: 'shell:resize',
                    cols,
                    rows,
                    id: this.props.id,
                });
            }
        };
        this.handleMessage = (data) => {
            if (data.id === this.props.id) {
                if (data.type === 'shell:out' && !this.props.ended) {
                    this.term.write(data.data);
                    if (this.props.updateStatus) {
                        this.props.updateStatus('info');
                    }
                }
                else if (data.type === 'shell:exit') {
                    if (!this.props.script) {
                        setTimeout(() => {
                            this.props.closeShell();
                        }, 300);
                    }
                    else {
                        this.props.endShell();
                        this.term.write(`\n\rSession finished with status code ${data.code}\n\r`);
                    }
                }
                else if (data.type === 'codesandbox:sse:disconnect') {
                    this.props.endShell();
                    this.term.write(`\n\rConnection with the server has been lost\n\r`);
                }
            }
        };
    }
    componentWillUnmount() {
        this.listener();
        dispatch({
            type: 'socket:message',
            channel: 'shell:close',
            id: this.props.id,
        });
    }
    render() {
        const { hidden, theme } = this.props;
        return (<TerminalComponent hidden={hidden} theme={theme} onTerminalInitialized={this.initializeTerminal}/>);
    }
}
export const Shell = withTheme(ShellComponent);

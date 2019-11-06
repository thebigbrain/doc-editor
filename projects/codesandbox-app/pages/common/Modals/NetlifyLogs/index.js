import React, { Component } from 'react';
import { withOvermind } from '@muggle/hooks';
import { Button } from '@csb/common/lib/components/Button';
import { Container } from '../LiveSessionEnded/elements';
import { Explanation, Heading } from '../elements';

import { Item, List } from './elements';

class NetlifyLogs extends Component {
  state = { logs: ['Contacting Netlify'] };
  getLogs = async () => {
    const url = this.props.overmind.state.deployment.netlifyLogs;

    const data = await fetch(url);
    const { logs } = await data.json();

    this.setState({ logs });
  };

  componentDidMount() {
    this.interval = setInterval(this.getLogs, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { actions } = this.props.overmind;

    return (
      <Container>
        <Heading>Sandbox Site Logs</Heading>
        <Explanation>
          Builds typically take a minute or two to complete
        </Explanation>
        <List>
          {this.state.logs.map(log => (
            <Item key={log}>{log}</Item>
          ))}
        </List>
        <Button small onClick={() => actions.modalClosed()}>
          Close
        </Button>
      </Container>
    );
  }
}

export default withOvermind(NetlifyLogs);

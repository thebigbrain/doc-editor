import React, { Component } from 'react'
import { inject, observer } from 'app/componentConnectors'

import { Button } from '@codesandbox/common/lib/components/Button'
import { Container } from '../LiveSessionEnded/elements'
import { Explanation, Heading } from '../elements'

import { Item, List } from './elements'

class NetlifyLogs extends Component {
  state = { logs: ['Contacting Netlify'] }
  getLogs = async () => {
    const url = this.props.store.deployment.netlifyLogs

    const data = await fetch(url)
    const { logs } = await data.json()

    this.setState({ logs })
  }

  componentDidMount() {
    this.interval = setInterval(this.getLogs, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { signals } = this.props

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
        <Button small onClick={() => signals.modalClosed()}>
          Close
        </Button>
      </Container>
    )
  }
}

export default inject('signals', 'store')(observer(NetlifyLogs))

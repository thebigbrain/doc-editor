import React from 'react'
import { format } from 'date-fns'
import { getSandboxName } from '@csb/common/lib/utils/get-sandbox-name'

import { Button, Date } from './elements'

export default class Sandbox extends React.PureComponent {
  setShowcase = () => {
    this.props.setShowcasedSandbox(this.props.sandbox.id)
  }

  render() {
    const { sandbox, active } = this.props
    return (
      <Button active={active} onClick={this.setShowcase}>
        <div>
          {getSandboxName(sandbox)}
          {active && ' (Selected)'}
        </div>
        <Date>{format(sandbox.insertedAt, 'MMM DD, YYYY')}</Date>
      </Button>
    )
  }
}

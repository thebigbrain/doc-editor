import React from 'react'
import { inject, observer } from 'app/componentConnectors'

import { Button } from '@csb/common/lib/components/Button'
import Row from '@csb/common/lib/components/flex/Row'

import { Container, Explanation, Heading } from './elements'

function SignOutNotice({ signals }) {
  return (
    <Container>
      <Heading>You have been signed out</Heading>
      <Explanation>
        CodeSandbox has migrated to a system where authorization tokens can be
        managed and revoked, and we had to sign everyone out for this.
        <br/>
        <br/>
        But don
        {'\''}t worry, you can sign in right again!
      </Explanation>

      <Row justifyContent="space-around">
        <Button
          block
          style={{ marginRight: '.5rem' }}
          red
          onClick={() => {
            signals.modalClosed()
          }}
        >
          Close
        </Button>
        <Button
          block
          style={{ marginLeft: '.5rem' }}
          onClick={() => signals.signInClicked({ useExtraScopes: false })}
        >
          Sign in
        </Button>
      </Row>
    </Container>
  )
}

export default inject('store', 'signals')(observer(SignOutNotice))

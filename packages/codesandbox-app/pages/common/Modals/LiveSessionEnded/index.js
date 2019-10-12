import React from 'react'

import { Button } from '@codesandbox/common/lib/components/Button'
import Row from '@codesandbox/common/lib/components/flex/Row'

import { Container } from './elements'
import { Explanation, Heading } from '../elements'
import {useOvermind} from '~/overmind'


function LiveModeEnded() {
  const {state: store, actions: signals} = useOvermind()

  const suggestion = store.editor.currentSandbox.owned
    ? 'you can continue working on the current sandbox.'
    : 'you can continue working by forking the sandbox or by creating a new sandbox.'
  return (
    <Container>
      <Heading>The live session has ended</Heading>
      <Explanation css={{ marginBottom: '1rem' }}>
        {store.currentModalMessage || 'The session has ended due to inactivity'}
        , {suggestion}
      </Explanation>

      <Row justifyContent="space-around">
        <Button small href="/s">
          Create Sandbox
        </Button>

        {store.editor.currentSandbox.owned ? (
          <Button
            small
            onClick={() => {
              signals.modalClosed()
            }}
          >
            Close Modal
          </Button>
        ) : (
          <Button
            small
            onClick={() => {
              signals.editor.forkSandboxClicked()
              signals.modalClosed()
            }}
          >
            Fork Sandbox
          </Button>
        )}
      </Row>
    </Container>
  )
}

export default LiveModeEnded

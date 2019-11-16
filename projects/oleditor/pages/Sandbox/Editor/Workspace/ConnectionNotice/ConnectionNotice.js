import React from 'react'
import { Container } from './elements'
import {useOvermind} from '@muggle/hooks'

export const ConnectionNotice = () => {
  const {state: { connected }} = useOvermind()

  return !connected && (
    <Container>
      You{'\''}re not connected to the internet. You can still edit, but you
      cannot save. We recommend using the {'\''}Download{'\''} function to
      keep your changes.
    </Container>
  )
}

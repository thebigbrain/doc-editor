import React from 'react'
import { SignInButton } from '../../SignInButton/index'
import { Explanation, Heading } from '../elements'
import { Container } from '../LiveSessionEnded/elements'
import { Buttons, Close } from './elements'
import {useOvermind} from '@muggle/hooks'

export const SignInForTemplates = () => {
  const {actions: { modalClosed }} = useOvermind()

  return (
    <Container>
      <Close onClick={() => modalClosed()}/>

      <Heading>Sign in to create templates</Heading>

      <Explanation>
        You can only create templates as a logged in user.
      </Explanation>

      <Buttons>
        <SignInButton/>
      </Buttons>
    </Container>
  )
}

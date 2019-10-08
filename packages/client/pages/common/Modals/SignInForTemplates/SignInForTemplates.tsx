import React from 'react';
import { hooksObserver, inject } from 'app/componentConnectors';

import { SignInButton } from '../../SignInButton';
import { Explanation, Heading } from '../elements';
import { Container } from '../LiveSessionEnded/elements';
import { Buttons, Close } from './elements';

export const SignInForTemplates = inject('signals')(
  hooksObserver(({ signals: { modalClosed } }) => (
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
  )),
);

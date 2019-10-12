import React from 'react';

import { Button } from '@codesandbox/common/lib/components/Button';
import { newSandboxWizard } from '@codesandbox/common/lib/utils/url-generator';

import { Buttons, Container, SubTitle, Title } from './elements';
import {useOvermind} from '~/overmind'

export const NotFound = () => {
  const {state} = useOvermind()

  return (
    <Container>
      <Title>404</Title>
      <SubTitle>
        We could not find the page you
        {'\''}
        re looking for.
      </SubTitle>
      <Buttons>
        <Button small block style={{ margin: '.5rem' }} to={newSandboxWizard()}>
          Create Sandbox
        </Button>
        <Button small block style={{ margin: '.5rem' }} href="/">
          {state.hasLogIn ? 'Dashboard' : 'Homepage'}
        </Button>
      </Buttons>
    </Container>
  )
}


// eslint-disable-next-line import/no-default-export
export default NotFound;

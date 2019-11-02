import React from 'react';

import { Button } from '@csb/common/lib/components/Button';
import { newSandboxWizard } from '@csb/common/lib/utils/url-generator';

import { Buttons, Container, SubTitle, Title } from './elements';
import {useOvermind} from '@muggle/hooks'

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
        <Button small='small' block='block' style={{ margin: '.5rem' }} to={newSandboxWizard()}>
          Create Sandbox
        </Button>
        <Button small='small' block='block' style={{ margin: '.5rem' }} href="/">
          {state.hasLogIn ? 'Dashboard' : 'Homepage'}
        </Button>
      </Buttons>
    </Container>
  )
}


// eslint-disable-next-line import/no-default-export
export default NotFound;

import * as React from 'react';

import { GoMarkGithub as GithubIcon} from 'react-icons/go';
import { Button } from '@codesandbox/common/lib/components/Button';
import Row from '@codesandbox/common/lib/components/flex/Row';
import {useOvermind} from '~/overmind'

const SignInButtonComponent = (props) => {
  const { actions } = useOvermind()

  return (
    <Button small onClick={actions.signInClicked} {...props}>
      <Row>
        <GithubIcon style={{ marginRight: '0.5rem' }}/> Sign in with GitHub
      </Row>
    </Button>
  );
};

export const SignInButton = SignInButtonComponent

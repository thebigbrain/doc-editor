import React from 'react';
import {
  GoHome,
  GoIssueOpened
} from 'react-icons/go';
import { Button } from '@codesandbox/common/lib/components/Button';
import { dashboardUrl } from '@codesandbox/common/lib/utils/url-generator';
import { Navigation } from '~/pages/common/Navigation';
// @ts-ignore
import Dashboard from '@codesandbox/common/lib/icons/dashboard.svg';
import { Sadbox } from './Sadbox';
import { buildCrashReport } from './buildCrashReport';
import { Actions, ButtonIcon, Container, Content, Header, Nav, Subtitle, Title } from './elements';
import { useOvermind } from '@doce/hooks'

export const CodeSadbox = ({ error, trace }) => {
  const {state} = useOvermind()

  return (
    <Container>
      <Header>
        <Nav>
          <Navigation title="CodeSadbox"/>
        </Nav>
      </Header>
      <Content>
        <Title>Oh no! Something broke!</Title>
        <Sadbox scale={3}/>
        <Subtitle>CodeSadbox</Subtitle>
        <Actions>
          {state.isLoggedIn ? (
            <Button small secondary href={dashboardUrl()}>
              <ButtonIcon>
                <Dashboard/>
              </ButtonIcon>
              Go to Dashboard
            </Button>
          ) : (
            <Button small secondary href="/">
              <ButtonIcon>
                <GoHome/>
              </ButtonIcon>
              Back to Home
            </Button>
          )}
          {/*
          // @ts-ignore */}
          <Button
            small
            target="_blank"
            rel="noopener"
            href={buildCrashReport({ error, trace })}
          >
            <ButtonIcon>
              <GoIssueOpened/>
            </ButtonIcon>
            Report Crash
          </Button>
        </Actions>
      </Content>
    </Container>
  )
}


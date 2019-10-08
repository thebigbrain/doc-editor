import React from 'react';
import GoHome from 'react-icons/lib/go/home';
import GoIssueOpened from 'react-icons/lib/go/issue-opened';
import { hooksObserver, inject } from 'app/componentConnectors';
import { Button } from '@codesandbox/common/lib/components/Button';
import { dashboardUrl } from '@codesandbox/common/lib/utils/url-generator';
import { Navigation } from 'app/pages/common/Navigation';
// @ts-ignore
import Dashboard from '-!svg-react-loader!@codesandbox/common/lib/icons/dashboard.svg';
import { Sadbox } from './Sadbox';
import { IFallbackComponentProps } from '../types';
import { buildCrashReport } from './buildCrashReport';
import { Actions, ButtonIcon, Container, Content, Header, Nav, Subtitle, Title } from './elements';

export const CodeSadbox = inject('store')(
  hooksObserver(
    ({ error, trace, store }: IFallbackComponentProps & { store: any }) => (
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
            {store.isLoggedIn ? (
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
    ),
  ),
);

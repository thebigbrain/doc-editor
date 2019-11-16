import {dashboardUrl} from '@csb/common/lib/utils/url-generator'
import React from 'react'

import { UserMenu } from '~/pages/common/UserMenu';

import {
  SaveAllButton,
  RefreshButton,
  PatronButton,
  PreferencesButton,
  NewSandboxButton,
  LikeButton,
  PickButton,
  ShareButton,
  ForkButton,
} from './Buttons/index'
import {
  Container,
  Right,
  Left,
  Centered,
  DashboardIcon,
  DashboardLink,
  AccountContainer,
  UserMenuContainer,
  SignInButton,
} from './elements'
import {Logo} from './Logo/index'
// import {MenuBar} from './MenuBar'
import {SandboxName} from './SandboxName/index'
import {useOvermind} from '@muggle/hooks'

export const Header = ({zenMode}) => {
  const {state} = useOvermind()
  const vscode = state.preferences.settings.experimentVSCode

  return (
    <Container zenMode={zenMode}>
      <Left>
        {state.hasLogIn ? (
          <DashboardLink to={dashboardUrl()}>
            <DashboardIcon/>
          </DashboardLink>
        ) : (
          <Logo/>
        )}

        {/*{vscode ? <MenuBar/> : <SaveAllButton/>}*/}
      </Left>

      <Centered>
        <SandboxName/>
      </Centered>

      <Right>
        {state.updateStatus === 'available' && <RefreshButton/>}
        {!state.isLoggedIn || (!state.isPatron && <PatronButton/>)}
        {!state.isLoggedIn && <PreferencesButton/>}
        <NewSandboxButton/>
        {state.isLoggedIn && <LikeButton/>}
        {state.user && state.user.curatorAt && <PickButton/>}
        <ShareButton/>
        <ForkButton/>
        <AccountContainer>
          {state.isLoggedIn ? (
            <UserMenuContainer>
              <UserMenu />
            </UserMenuContainer>
          ) : (
            <SignInButton />
          )}
        </AccountContainer>
      </Right>
    </Container>
  )
}

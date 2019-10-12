import * as React from 'react';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import { exploreUrl, patronUrl, searchUrl } from '@codesandbox/common/lib/utils/url-generator';

import {
  GoSearch as SearchIcon,
  GoPlus as PlusIcon,
  GoFlame as FlameIcon,
} from 'react-icons/go';
import {
  MdNotifications as BellIcon
} from 'react-icons/md';
import Row from '@codesandbox/common/lib/components/flex/Row';
import Tooltip from '@codesandbox/common/lib/components/Tooltip';
import { HeaderSearchBar } from '~/components/HeaderSearchBar';
import { Overlay } from '~/components/Overlay';
// @ts-ignore
import PatronBadge from '@codesandbox/common/lib/utils/badges/svg/patron-4.svg';
import { Notifications } from './Notifications/index';

import { SignInButton } from '../SignInButton/index';
import { UserMenu } from '../UserMenu/index';
import { Action, Actions, Border, LogoWithBorder, Title, TitleWrapper, UnreadIcon, Wrapper } from './elements';
import { useOvermind } from '~/overmind'

export const Navigation = ({ title, searchNoInput, }) => {
  const {
    state: { isLoggedIn, isPatron, user, userNotifications },
    actions: { modalOpened, userNotifications: userNotificationsSignals }
  } = useOvermind()

  return (
    <Row justifyContent="space-between">
      <TitleWrapper>
        <a href="/?from-app=1">
          <LogoWithBorder height={35} width={35}/>
        </a>
        <Border/>
        <Title>{title}</Title>
      </TitleWrapper>
      <Wrapper>
        <Actions>
          <Action>
            <Media query="(max-width: 920px)">
              {matches =>
                matches || searchNoInput ? (
                  <Tooltip placement="bottom" content="Search All Sandboxes">
                    <Link style={{ color: 'white' }} to={searchUrl()}>
                      <SearchIcon height={35}/>
                    </Link>
                  </Tooltip>
                ) : (
                  <HeaderSearchBar/>
                )
              }
            </Media>
          </Action>

          <Action>
            <Tooltip placement="bottom" content="Explore Sandboxes">
              <a style={{ color: 'white' }} href={exploreUrl()}>
                <FlameIcon/>
              </a>
            </Tooltip>
          </Action>

          {!isPatron && (
            <Action>
              <Tooltip placement="bottom" content="Support CodeSandbox">
                <Link to={patronUrl()}>
                  <PatronBadge width={40} height={40}/>
                </Link>
              </Tooltip>
            </Action>
          )}

          {user && (
            <Overlay
              isOpen={userNotifications.notificationsOpened}
              content={Notifications}
              onOpen={userNotificationsSignals.notificationsOpened}
              onClose={userNotificationsSignals.notificationsClosed}
              event="Notifications"
              noHeightAnimation
            >
              {open => (
                <Observer>
                  {({ store }) => (
                    <Action
                      style={{ position: 'relative', fontSize: '1.25rem' }}
                      onClick={open}
                    >
                      <Tooltip
                        placement="bottom"
                        content={
                          store.userNotifications.unreadCount > 0
                            ? 'Show Notifications'
                            : 'No Notifications'
                        }
                      >
                        <BellIcon height={35}/>
                        {store.userNotifications.unreadCount > 0 && (
                          <UnreadIcon/>
                        )}
                      </Tooltip>
                    </Action>
                  )}
                </Observer>
              )}
            </Overlay>
          )}

          <Action
            style={{ fontSize: '1.125rem' }}
            onClick={() =>
              modalOpened({
                modal: 'newSandbox',
              })
            }
          >
            <Tooltip placement="bottom" content="New Sandbox">
              <PlusIcon height={35}/>
            </Tooltip>
          </Action>
        </Actions>

        {isLoggedIn ? <UserMenu/> : <SignInButton/>}
      </Wrapper>
    </Row>
  );
}

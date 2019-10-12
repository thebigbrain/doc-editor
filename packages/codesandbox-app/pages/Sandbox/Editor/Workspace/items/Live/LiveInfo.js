import React from 'react'
import styled from 'styled-components'
import { sortBy } from 'lodash-es'

import {
  MdFiberManualRecord as RecordIcon,
  MdAdd as AddIcon,
  MdRemove as RemoveIcon
} from 'react-icons/md'
import Input from '@codesandbox/common/lib/components/Input'
import Margin from '@codesandbox/common/lib/components/spacing/Margin'
import delay from '@codesandbox/common/lib/utils/animation/delay-effect'
import Switch from '@codesandbox/common/lib/components/Switch'

import Tooltip from '@codesandbox/common/lib/components/Tooltip'

import {
  IoIosEye as FollowIcon,
  IoIosEyeOff as UnFollowIcon
} from 'react-icons/io'

import User from './User'
import Countdown from './Countdown'
import LiveButton from './LiveButton'

import { Description, WorkspaceInputContainer } from '../../elements'

const Container = styled.div`
  ${delay()};
  color: ${props =>
  props.theme.light ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
  box-sizing: border-box;
`

const Title = styled.div`
  color: #fd2439fa;
  font-weight: 800;
  display: flex;
  align-items: center;
  vertical-align: middle;

  padding: 0.5rem 1rem;
  padding-top: 0;

  svg {
    margin-right: 0.25rem;
  }
`

const StyledInput = styled(Input)`
  width: calc(100% - 1.5rem);
  margin: 0 0.75rem;
  font-size: 0.875rem;
`

const SubTitle = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);

  padding-left: 1rem;
  font-size: 0.875rem;
`

const Users = styled.div`
  padding: 0.25rem 1rem;
  padding-top: 0;
  color: ${props =>
  props.theme.light ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
`

const ModeSelect = styled.div`
  position: relative;
  margin: 0.5rem 1rem;
`

const Mode = styled.button`
  display: block;
  text-align: left;
  transition: 0.3s ease opacity;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 4px;
  width: 100%;
  font-size: 1rem;

  font-weight: 600;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: ${props => (props.onClick ? 'pointer' : 'inherit')};
  color: white;
  opacity: ${props => (props.selected ? 1 : 0.6)};
  margin: 0.25rem 0;

  z-index: 3;

  ${props =>
  props.onClick &&
  `
  &:hover {
    opacity: 1;
  }`};
`

const ModeDetails = styled.div`
  font-size: 0.75rem;
  color: ${props =>
  props.theme.light ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
  margin-top: 0.25rem;
`

const ModeSelector = styled.div`
  transition: 0.3s ease transform;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 48px;

  border: 2px solid rgba(253, 36, 57, 0.6);
  background-color: rgba(253, 36, 57, 0.6);
  border-radius: 4px;
  z-index: -1;

  transform: translateY(${props => props.i * 55}px);
`

const PreferencesContainer = styled.div`
  margin: 1rem;
  display: flex;
`

const Preference = styled.div`
  flex: 1;
  font-weight: 400;
  color: ${props =>
  props.theme.light ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
`

const IconContainer = styled.div`
  transition: 0.3s ease color;
  color: ${props =>
  props.theme.light ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  cursor: pointer;

  &:hover {
    color: white;
  }
`

class LiveInfo extends React.Component {
  select = e => {
    e.target.select()
  }

  render() {
    const {
      roomInfo,
      isOwner,
      isTeam,
      ownerIds,
      setMode,
      addEditor,
      removeEditor,
      currentUserId,
      reconnecting,
      onSessionCloseClicked,
      notificationsHidden,
      toggleNotificationsHidden,
      chatEnabled,
      toggleChatEnabled,
      setFollowing,
      followingUserId,
    } = this.props

    const owners = roomInfo.users.filter(u => ownerIds.includes(u.id))

    const editors = sortBy(
      roomInfo.users.filter(
        u => roomInfo.editorIds.includes(u.id) && !ownerIds.includes(u.id),
      ),
      'username',
    )
    const otherUsers = sortBy(
      roomInfo.users.filter(
        u => !ownerIds.includes(u.id) && !roomInfo.editorIds.includes(u.id),
      ),
      'username',
    )

    const liveMessage = (() => {
      if (isTeam) {
        return 'Your team is live!'
      }

      if (isOwner) {
        return 'You\'ve gone live!'
      }

      return 'You are live!'
    })()

    return (
      <Container>
        <Title>
          <div
            style={{
              fontSize: '1rem',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {reconnecting ? (
              'Reconnecting...'
            ) : (
              <>
                <RecordIcon/> {liveMessage}
              </>
            )}
          </div>
          <div>
            {roomInfo.startTime != null && (
              <Countdown time={roomInfo.startTime}/>
            )}
          </div>
        </Title>
        <Description>
          Share this link with others to invite them to the session:
        </Description>
        <StyledInput
          onFocus={this.select}
          value={`https://codesandbox.io/live/${roomInfo.roomId}`}
        />

        {isOwner && !isTeam && (
          <WorkspaceInputContainer>
            <LiveButton
              message="Stop Session"
              onClick={onSessionCloseClicked}
              showIcon={false}
            />
          </WorkspaceInputContainer>
        )}

        <Margin top={1}>
          <SubTitle>Preferences</SubTitle>

          {isOwner && (
            <PreferencesContainer>
              <Preference>Chat enabled</Preference>
              <Switch
                right={chatEnabled}
                onClick={toggleChatEnabled}
                small
                offMode
                secondary
              />
            </PreferencesContainer>
          )}
          <PreferencesContainer>
            <Preference>Hide notifications</Preference>
            <Switch
              right={notificationsHidden}
              onClick={toggleNotificationsHidden}
              small
              offMode
              secondary
            />
          </PreferencesContainer>
        </Margin>

        <Margin top={1}>
          <SubTitle>Live Mode</SubTitle>
          <ModeSelect>
            <ModeSelector i={roomInfo.mode === 'open' ? 0 : 1}/>
            <Mode
              onClick={isOwner ? () => setMode({ mode: 'open' }) : undefined}
              selected={roomInfo.mode === 'open'}
            >
              <div>Open</div>
              <ModeDetails>Everyone can edit</ModeDetails>
            </Mode>
            <Mode
              onClick={
                isOwner ? () => setMode({ mode: 'classroom' }) : undefined
              }
              selected={roomInfo.mode === 'classroom'}
            >
              <div>Classroom</div>
              <ModeDetails>Take control over who can edit</ModeDetails>
            </Mode>
          </ModeSelect>
        </Margin>

        {owners && (
          <Margin top={1}>
            <SubTitle>Owners</SubTitle>
            <Users>
              {owners.map(owner => (
                <User
                  key={owner.id}
                  currentUserId={currentUserId}
                  user={owner}
                  roomInfo={roomInfo}
                  type="Owner"
                  sideView={
                    owner.id !== currentUserId && (
                      <IconContainer>
                        {followingUserId === owner.id ? (
                          <Tooltip content="Stop following">
                            <UnFollowIcon
                              onClick={() => setFollowing({ liveUserId: null })}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip content="Follow along">
                            <FollowIcon
                              onClick={() =>
                                setFollowing({ liveUserId: owner.id })
                              }
                            />
                          </Tooltip>
                        )}
                      </IconContainer>
                    )
                  }
                />
              ))}
            </Users>
          </Margin>
        )}

        {editors.length > 0 && roomInfo.mode === 'classroom' && (
          <Margin top={1}>
            <SubTitle>Editors</SubTitle>
            <Users>
              {editors.map(user => (
                <User
                  currentUserId={currentUserId}
                  key={user.id}
                  user={user}
                  roomInfo={roomInfo}
                  type="Editor"
                  sideView={
                    <>
                      {user.id !== currentUserId && (
                        <IconContainer>
                          {followingUserId === user.id ? (
                            <Tooltip content="Stop following">
                              <UnFollowIcon
                                onClick={() =>
                                  setFollowing({ liveUserId: null })
                                }
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip content="Follow along">
                              <FollowIcon
                                onClick={() =>
                                  setFollowing({ liveUserId: user.id })
                                }
                              />
                            </Tooltip>
                          )}
                        </IconContainer>
                      )}
                      {isOwner && roomInfo.mode === 'classroom' && (
                        <IconContainer style={{ marginLeft: '0.25rem' }}>
                          <Tooltip content="Make spectator">
                            <RemoveIcon
                              onClick={() =>
                                removeEditor({ liveUserId: user.id })
                              }
                            />
                          </Tooltip>
                        </IconContainer>
                      )}
                    </>
                  }
                />
              ))}
            </Users>
          </Margin>
        )}

        <Margin top={1}>
          <SubTitle>Users</SubTitle>

          <Users>
            {otherUsers.length ? (
              otherUsers.map(user => (
                <User
                  currentUserId={currentUserId}
                  key={user.id}
                  user={user}
                  roomInfo={roomInfo}
                  type="Spectator"
                  sideView={
                    <>
                      {roomInfo.mode !== 'classroom' &&
                      user.id !== currentUserId && (
                        <IconContainer>
                          {followingUserId === user.id ? (
                            <Tooltip content="Stop following">
                              <UnFollowIcon
                                onClick={() =>
                                  setFollowing({ liveUserId: null })
                                }
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip content="Follow along">
                              <FollowIcon
                                onClick={() =>
                                  setFollowing({ liveUserId: user.id })
                                }
                              />
                            </Tooltip>
                          )}
                        </IconContainer>
                      )}
                      {isOwner && roomInfo.mode === 'classroom' && (
                        <IconContainer style={{ marginLeft: '0.25rem' }}>
                          <Tooltip content="Make editor">
                            <AddIcon
                              onClick={() => addEditor({ liveUserId: user.id })}
                            />
                          </Tooltip>
                        </IconContainer>
                      )}
                    </>
                  }
                />
              ))
            ) : (
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 600,
                  fontSize: '.875rem',
                  marginTop: '0.25rem',
                }}
              >
                No other users in session, invite them!
              </div>
            )}
          </Users>
        </Margin>
      </Container>
    )
  }
}

export default inject('store')(observer(LiveInfo))

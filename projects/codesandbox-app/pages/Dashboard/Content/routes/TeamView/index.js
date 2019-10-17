import React from 'react'
import Helmet from 'react-helmet'
import { Mutation, Query } from 'react-apollo'
import { Observer } from 'app/componentConnectors'
import { sortBy } from 'lodash-es'

import { UserWithAvatar } from '@csb/common/lib/components/UserWithAvatar'
import { Button } from '@csb/common/lib/components/Button'
import AutosizeTextArea from '@csb/common/lib/components/AutosizeTextArea'
import Margin from '@csb/common/lib/components/spacing/Margin'
import track from '@csb/common/lib/utils/analytics'

import { Container, Description, HeaderContainer } from '../../elements'
import { MemberHeader, Members, Section, StyledEditIcon, TeamContainer } from './elements'
import { REVOKE_TEAM_INVITATION, SET_TEAM_DESCRIPTION, TEAM_QUERY } from '../../../queries'

import AddTeamMember from './AddTeamMember/index'
import RemoveTeamMember from './RemoveTeamMember/index'

const User = ({ user, rightElement }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      fontWeight: 600,
      marginBottom: '.5rem',
      color: 'rgba(255, 255, 255, 0.9)',
    }}
  >
    <div style={{ width: '100%' }}>
      <UserWithAvatar
        name={user.name}
        username={user.username}
        avatarUrl={user.avatarUrl}
        hideBadge
        useBigName
      />
    </div>

    {rightElement}
  </div>
)

class TeamView extends React.PureComponent {
  state = {
    editingDescription: false,
  }

  render() {
    const { teamId } = this.props.match.params

    return (
      <Container>
        <Query query={TEAM_QUERY} variables={{ id: teamId }}>
          {({ data, loading, error }) => (
            <Observer>
              {({ store }) => {
                const currentUser = store.user
                if (loading || error) {
                  return null
                }

                const description =
                  data.me.team.description ||
                  `This is a description for your team. You can change this description and invite people to the team so they can edit the sandboxes of this team.`

                return (
                  <TeamContainer>
                    <Helmet>
                      <title>{data.me.team.name} - CodeSandbox</title>
                    </Helmet>
                    <Section>
                      <HeaderContainer>{data.me.team.name}</HeaderContainer>
                      <Description>
                        {this.state.editingDescription ? (
                          <Mutation mutation={SET_TEAM_DESCRIPTION}>
                            {(mutate, { loading: descriptionLoading }) => {
                              let input = null

                              const stopEditing = () => {
                                this.setState({ editingDescription: false })
                              }
                              const submit = e => {
                                e.preventDefault()
                                e.stopPropagation()

                                mutate({
                                  variables: {
                                    teamId,
                                    description: input.value,
                                  },
                                }).then(stopEditing)
                              }

                              return (
                                <form
                                  onSubmit={
                                    descriptionLoading ? undefined : submit
                                  }
                                  style={{ width: '100%' }}
                                >
                                  <div
                                    style={{
                                      width: '100%',
                                      lineHeight: '1.6',
                                    }}
                                  >
                                    <AutosizeTextArea
                                      inputRef={node => {
                                        input = node
                                      }}
                                      multiline
                                      style={{
                                        padding: '.5em',
                                        lineHeight: '1.6',
                                      }}
                                      defaultValue={description}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      width: 300,
                                      float: 'right',
                                    }}
                                  >
                                    <Button
                                      style={{ marginRight: '.5rem' }}
                                      red
                                      small
                                      onClick={stopEditing}
                                      type="reset"
                                      disabled={descriptionLoading}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      style={{ marginLeft: '.5rem' }}
                                      small
                                      type="submit"
                                      disabled={descriptionLoading}
                                    >
                                      Confirm
                                    </Button>
                                  </div>
                                </form>
                              )
                            }}
                          </Mutation>
                        ) : (
                          <div>
                            {description}

                            <StyledEditIcon
                              onClick={() => {
                                this.setState(state => ({
                                  editingDescription: !state.editingDescription,
                                }))
                              }}
                            />
                          </div>
                        )}
                      </Description>
                    </Section>
                    <Section>
                      <HeaderContainer>Team Members</HeaderContainer>

                      <Members style={{ fontSize: '1rem' }}>
                        {sortBy(
                          data.me.team.users,
                          u => u.name || u.username,
                        ).map(user => (
                          <User
                            user={user}
                            key={user.username}
                            rightElement={
                              <RemoveTeamMember
                                creatorId={data.me.team.creatorId}
                                currentUserId={currentUser.id}
                                userId={user.id}
                                name={user.name || user.usermame}
                                teamId={teamId}
                                totalMemberSize={
                                  data.me.team.users.length +
                                  data.me.team.invitees.length
                                }
                              />
                            }
                          />
                        ))}

                        {data.me.team.invitees &&
                        data.me.team.invitees.length > 0 && (
                          <>
                            <MemberHeader>Invited Members</MemberHeader>

                            {data.me.team.invitees.map(user => (
                              <Mutation
                                key={user.username}
                                mutation={REVOKE_TEAM_INVITATION}
                              >
                                {(mutate, { loading: revokeLoading }) => {
                                  track('Team - Revoke Invitation')

                                  const handleClick = () =>
                                    mutate({
                                      variables: { userId: user.id, teamId },
                                    })

                                  return (
                                    <User
                                      user={user}
                                      style={{
                                        opacity: revokeLoading ? 0.5 : 1,
                                      }}
                                      rightElement={
                                        <div
                                          style={{
                                            float: 'right',
                                            fontSize: '.75rem',
                                          }}
                                        >
                                          <Button
                                            onClick={handleClick}
                                            disabled={revokeLoading}
                                            small
                                          >
                                            {revokeLoading
                                              ? 'Revoking...'
                                              : 'Revoke'}
                                          </Button>
                                        </div>
                                      }
                                    />
                                  )
                                }}
                              </Mutation>
                            ))}
                          </>
                        )}

                        <Margin top={1}>
                          <AddTeamMember teamId={teamId}/>
                        </Margin>
                      </Members>
                    </Section>
                  </TeamContainer>
                )
              }}
            </Observer>
          )}
        </Query>
      </Container>
    )
  }
}

export default TeamView

import React from 'react'
import history from 'app/utils/history'
import { inject, observer, Observer } from 'app/componentConnectors'
import { Route, withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import Input from '@codesandbox/common/lib/components/Input'
import { Button } from '@codesandbox/common/lib/components/Button'
import PeopleIcon from 'react-icons/lib/md/people'
// @ts-ignore
import { teamOverviewUrl } from '@codesandbox/common/lib/utils/url-generator'
import DashboardIcon from '-!svg-react-loader!@codesandbox/common/lib/icons/dashboard.svg'

import { Item } from './Item/index'
import { SandboxesItem } from './SandboxesItem/index'
import { TrashItem } from './TrashItem/index'
import { CategoryHeader, InputWrapper, Items, SidebarStyled } from './elements'
import { TEAMS_QUERY } from '../queries'
import { TemplateItem } from './TemplateItem/index'

class Sidebar extends React.Component {
  handleSearchFocus = () => {
    history.push('/dashboard/search', { from: 'sandboxSearchFocused' })
  }

  handleSearchChange = e => {
    this.props.signals.dashboard.searchChanged({ search: e.target.value })
  }

  render() {
    const { store } = this.props

    return (
      <SidebarStyled>
        <InputWrapper>
          <Input
            onFocus={this.handleSearchFocus}
            block
            value={store.dashboard.filters.search}
            onChange={this.handleSearchChange}
            placeholder="Search my sandboxes"
          />
        </InputWrapper>

        <Route
          path={[
            '/dashboard/sandboxes/:path*',
            '/dashboard/teams/:teamId/sandboxes/:path*',
            '/',
          ]}
        >
          {routeProps => {
            const testRegex = /\/dashboard.*?sandboxes/

            const path = routeProps.location.pathname.replace(testRegex, '')
            const currentTeamId = routeProps.match
              ? routeProps.match.params.teamId
              : undefined

            return (
              <Observer>
                {({ store: innerStore }) => (
                  <>
                    <Items style={{ marginBottom: '1rem' }}>
                      <Item
                        Icon={DashboardIcon}
                        path="/dashboard/recent"
                        name="Overview"
                      />

                      <SandboxesItem
                        selectedSandboxes={
                          innerStore.dashboard.selectedSandboxes
                        }
                        currentPath={path}
                        currentTeamId={currentTeamId}
                        openByDefault
                      />

                      <TemplateItem currentPath={path}/>

                      <TrashItem currentPath={path}/>
                    </Items>

                    <Query query={TEAMS_QUERY}>
                      {({ loading, data, error }) => {
                        if (loading) {
                          return null
                        }

                        if (error || !data.me) {
                          return null
                        }

                        if (!(data && data.me)) {
                          return null
                        }

                        const { teams = [] } = data.me

                        return teams.map(team => (
                          <div key={team.id}>
                            <Items>
                              <CategoryHeader>{team.name}</CategoryHeader>
                              <Item
                                Icon={PeopleIcon}
                                path={teamOverviewUrl(team.id)}
                                name="Team Overview"
                              />

                              <SandboxesItem
                                whatTheFuck
                                selectedSandboxes={
                                  store.dashboard.selectedSandboxes
                                }
                                currentPath={path}
                                currentTeamId={currentTeamId}
                                teamId={team.id}
                              />

                              <TemplateItem
                                currentPath={path}
                                teamId={team.id}
                              />
                            </Items>
                          </div>
                        ))
                      }}
                    </Query>
                  </>
                )}
              </Observer>
            )
          }}
        </Route>

        <div style={{ margin: '2rem', fontSize: '.875rem' }}>
          <Button
            style={{ display: 'block' }}
            to="/dashboard/teams/new"
            small
            block
          >
            Create Team
          </Button>
        </div>
      </SidebarStyled>
    )
  }
}

export default inject('signals', 'store')(withRouter(observer(Sidebar)))

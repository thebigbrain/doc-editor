import React from 'react'
import history from '~/utils/history'
import { Route, withRouter } from 'react-router-dom'
// import { Query } from 'react-apollo'
import Input from '@csb/common/lib/components/Input'
import { Button } from '@csb/common/lib/components/Button'
import { PeopleIcon } from '@muggle/icons'
import { teamOverviewUrl } from '@csb/common/lib/utils/url-generator'
import DashboardIcon from '@csb/common/lib/icons/dashboard.svg'
import { useOvermind } from '@muggle/hooks'

import { Item } from './Item/index'
import { SandboxesItem } from './SandboxesItem/index'
import { TrashItem } from './TrashItem/index'
import { CategoryHeader, InputWrapper, Items, SidebarStyled } from './elements'
// import { TEAMS_QUERY } from '../queries'
import { TemplateItem } from './TemplateItem/index'

function Teams(props) {
  const {state} = useOvermind()
  const {currentTeamId} = props

  return state.user && (state.user.teams || []).map(team => (
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
            state.dashboard.selectedSandboxes
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
}

function Sidebar(props) {
  const { state, actions } = useOvermind()

  const handleSearchFocus = () => {
    history.push('/dashboard/search', { from: 'sandboxSearchFocused' })
  }

  const handleSearchChange = e => {
    actions.dashboard.searchChanged({ search: e.target.value })
  }

  return (
    <SidebarStyled>
      <InputWrapper>
        <Input
          onFocus={handleSearchFocus}
          block
          value={state.dashboard.filters.search}
          onChange={handleSearchChange}
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
            <>
              <Items style={{ marginBottom: '1rem' }}>
                <Item
                  Icon={DashboardIcon}
                  path="/dashboard/recent"
                  name="Overview"
                />

                <SandboxesItem
                  selectedSandboxes={
                    state.dashboard.selectedSandboxes
                  }
                  currentPath={path}
                  currentTeamId={currentTeamId}
                  openByDefault
                />

                <TemplateItem currentPath={path}/>

                <TrashItem currentPath={path}/>
              </Items>
              <Teams currentTeamId={currentTeamId}/>
            </>
          )
        }}
      </Route>

      <div style={{ margin: '2rem', fontSize: '.875rem' }}>
        <Button
          style={{ display: 'block' }}
          to="/dashboard/teams/new"
          small={'small'}
          block={'block'}
        >
          Create Team
        </Button>
      </div>
    </SidebarStyled>
  )
}

export default withRouter(Sidebar)

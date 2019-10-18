import React from 'react'

import { Query } from 'react-apollo'
import { SandboxesItem } from '~/pages/Dashboard/Sidebar/SandboxesItem'

import { TEAMS_QUERY } from '../../../Dashboard/queries'
import { TeamContainer, TeamName } from './elements'

export default ({ onSelect, currentPath, currentTeamId }) => (
  <div css={{ margin: '0 -1rem' }}>
    <SandboxesItem
      openByDefault
      onSelect={onSelect}
      currentPath={currentPath}
      currentTeamId={currentTeamId}
      teamId={undefined}
    />

    <Query query={TEAMS_QUERY}>
      {({ loading, data, error }) => {
        if (loading) {
          return null
        }

        if (error) {
          return null
        }

        const { teams } = data.me

        return teams.map(team => (
          <TeamContainer key={team.id}>
            <TeamName>{team.name}</TeamName>
            <SandboxesItem
              currentPath={currentPath}
              currentTeamId={currentTeamId}
              openByDefault
              teamId={team.id}
              onSelect={onSelect}
            />
          </TeamContainer>
        ))
      }}
    </Query>
  </div>
);

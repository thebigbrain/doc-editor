import React from 'react';
import { Container, NavigationLink, Number } from './elements';
export const Navigation = ({ teamId, number }) => (<Container>
    <NavigationLink to={teamId ? `/dashboard/teams/${teamId}/templates` : `/dashboard/templates`}>
      {teamId ? 'Team Templates' : 'My Templates'}
    </NavigationLink>

    {number == null && <Number>{number}</Number>}
  </Container>);

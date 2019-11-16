import React from 'react';

// import { Mutation } from 'react-apollo';
// import history from '~/utils/history';
// import { teamOverviewUrl } from '@csb/common/lib/utils/url-generator';
// import track from '@csb/common/lib/utils/analytics';

import { NotificationImage as Image } from '../elements';
import { Button, Buttons, Container, W } from './elements';
// import { ACCEPT_TEAM_INVITATION, REJECT_TEAM_INVITATION } from '../../../../Dashboard/queries';
import { useOvermind } from '@muggle/hooks'

export const TeamInvite =
    ({
       read,
       teamId,
       teamName,
       inviterName,
       inviterAvatar,
     }) => {
  const {actions: { notificationAdded }} = useOvermind()
  return (
        <div>
          <Container read={read}>
            <Image src={inviterAvatar}/>
            <div>
              <W>{inviterName}</W> invites you to join team <W>{teamName}</W>
            </div>
          </Container>
          {!read && (
            <Buttons>
              <Button decline>Decline</Button>
              <Button>Accept</Button>
              {/*<Mutation*/}
                {/*variables={{ teamId }}*/}
                {/*mutation={REJECT_TEAM_INVITATION}*/}
                {/*refetchQueries={['RecentNotifications']}*/}
                {/*onCompleted={() => {*/}
                  {/*track('Team - Invitation Rejected');*/}
                  {/*notificationAdded({*/}
                    {/*message: `Rejected invitation to ${teamName}`,*/}
                    {/*type: 'success',*/}
                  {/*});*/}
                {/*}}*/}
              {/*>*/}
                {/*{(mutate, { loading }) => (*/}
                  {/*<Button onClick={() => mutate()} disabled={loading} decline>*/}
                    {/*Decline*/}
                  {/*</Button>*/}
                {/*)}*/}
              {/*</Mutation>*/}
              {/*<Mutation*/}
                {/*variables={{ teamId }}*/}
                {/*mutation={ACCEPT_TEAM_INVITATION}*/}
                {/*refetchQueries={['RecentNotifications', 'TeamsSidebar']}*/}
                {/*onCompleted={() => {*/}
                  {/*track('Team - Invitation Accepted');*/}
                  {/*notificationAdded({*/}
                    {/*message: `Accepted invitation to ${teamName}`,*/}
                    {/*type: 'success',*/}
                  {/*});*/}

                  {/*history.push(teamOverviewUrl(teamId));*/}
                {/*}}*/}
              {/*>*/}
                {/*{(mutate, { loading }) => (*/}
                  {/*<Button onClick={() => mutate()} disabled={loading}>*/}
                    {/*Accept*/}
                  {/*</Button>*/}
                {/*)}*/}
              {/*</Mutation>*/}
            </Buttons>
          )}
        </div>
      )
    }

import React from 'react';

import { Mutation } from 'react-apollo';
import history from 'app/utils/history';
import { teamOverviewUrl } from '@codesandbox/common/lib/utils/url-generator';
import track from '@codesandbox/common/lib/utils/analytics';
import { hooksObserver, inject } from 'app/componentConnectors';

import { NotificationImage as Image } from '../elements';
import { Button, Buttons, Container, W } from './elements';
import { ACCEPT_TEAM_INVITATION, REJECT_TEAM_INVITATION } from '../../../../Dashboard/queries';

interface Props {
  read: boolean;
  teamId: string;
  teamName: string;
  inviterName: string;
  inviterAvatar: string;
}

export const TeamInvite = inject('signals')(
  hooksObserver(
    ({
       read,
       teamId,
       teamName,
       inviterName,
       inviterAvatar,
       signals: { notificationAdded },
     }: Props & { signals: any }) => (
      <div>
        <Container read={read}>
          <Image src={inviterAvatar}/>
          <div>
            <W>{inviterName}</W> invites you to join team <W>{teamName}</W>
          </div>
        </Container>
        {!read && (
          <Buttons>
            <Mutation
              variables={{ teamId }}
              mutation={REJECT_TEAM_INVITATION}
              refetchQueries={['RecentNotifications']}
              onCompleted={() => {
                track('Team - Invitation Rejected');
                notificationAdded({
                  message: `Rejected invitation to ${teamName}`,
                  type: 'success',
                });
              }}
            >
              {(mutate, { loading }) => (
                <Button onClick={() => mutate()} disabled={loading} decline>
                  Decline
                </Button>
              )}
            </Mutation>
            <Mutation
              variables={{ teamId }}
              mutation={ACCEPT_TEAM_INVITATION}
              refetchQueries={['RecentNotifications', 'TeamsSidebar']}
              onCompleted={() => {
                track('Team - Invitation Accepted');
                notificationAdded({
                  message: `Accepted invitation to ${teamName}`,
                  type: 'success',
                });

                history.push(teamOverviewUrl(teamId));
              }}
            >
              {(mutate, { loading }) => (
                <Button onClick={() => mutate()} disabled={loading}>
                  Accept
                </Button>
              )}
            </Mutation>
          </Buttons>
        )}
      </div>
    ),
  ),
);

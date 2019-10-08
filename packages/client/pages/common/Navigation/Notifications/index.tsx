import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { TeamInvite } from './notifications/TeamInvite';
import { TeamAccepted } from './notifications/TeamAccepted';

import { Container, Loading, NoNotifications, NotificationsContainer, Title } from './elements';

export const VIEW_QUERY = gql`
    query RecentNotifications {
        me {
            notifications(
                limit: 20
                orderBy: { field: "insertedAt", direction: ASC }
            ) {
                id
                type
                data
                read
            }
        }
    }
`;

const getNotificationComponent = (type, data, read) => {
  const parsedData = JSON.parse(data);

  if (type === 'team_invite') {
    return (
      <TeamInvite
        read={read}
        teamId={parsedData.team_id}
        teamName={parsedData.team_name}
        inviterName={parsedData.inviter_name}
        inviterAvatar={parsedData.inviter_avatar}
      />
    );
  }
  if (type === 'team_accepted') {
    return (
      <TeamAccepted
        read={read}
        teamName={parsedData.team_name}
        userAvatar={parsedData.user_avatar}
        userName={parsedData.user_name}
      />
    );
  }

  return <div/>;
};

export const Notifications = props => (
  <Container {...props}>
    <Title>Notifications</Title>
    <NotificationsContainer>
      <Query fetchPolicy="cache-and-network" query={VIEW_QUERY}>
        {({ loading, error, data }) => {
          if (error) {
            return (
              <NoNotifications>
                Something went wrong while fetching notifications
              </NoNotifications>
            );
          }

          if (loading) {
            return <Loading>Loading Notifications...</Loading>;
          }

          if (data.me.notifications.length === 0) {
            return (
              <NoNotifications>
                You don{'\''}t have any notifications
              </NoNotifications>
            );
          }

          return (
            <div>
              {data.me.notifications.map((notification, i) => (
                /* eslint-disable react/no-array-index-key */
                <div key={i}>
                  {getNotificationComponent(
                    notification.type,
                    notification.data,
                    notification.read,
                  )}
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    </NotificationsContainer>
  </Container>
);

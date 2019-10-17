import { client } from '~/graphql/client';
import gql from 'graphql-tag';
import * as internalActions from './internalActions';

export const internal = internalActions;

export const notificationsOpened = async ({ state, effects }) => {
  state.userNotifications.notificationsOpened = true;
  state.userNotifications.unreadCount = 0;
  client.mutate({
    mutation: gql`
        mutation ClearNotificationCount {
            clearNotificationCount {
                id
            }
        }
    `,
  });
};

export const notificationsClosed = ({ state }) => {
  state.userNotifications.notificationsOpened = false;
};

export const messageReceived = (
  { state },
  { event },
) => {
  if (event === 'new-notification') {
    state.userNotifications.unreadCount++;
  }
};

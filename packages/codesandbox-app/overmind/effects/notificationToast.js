import { convertTypeToStatus, notificationState } from '@codesandbox/common/lib/utils/notifications';
import {  NotificationStatus } from '@codesandbox/notifications/lib/state';

export default {
  convertTypeToStatus,
  add(notification) {
    notificationState.addNotification(notification);
  },
  error(message) {
    notificationState.addNotification({
      message,
      status: NotificationStatus.ERROR,
    });
  },
  success(message) {
    notificationState.addNotification({
      message,
      status: NotificationStatus.SUCCESS,
    });
  },
  warning(message) {
    notificationState.addNotification({
      message,
      status: NotificationStatus.WARNING,
    });
  },
  notice(message) {
    notificationState.addNotification({
      message,
      status: NotificationStatus.NOTICE,
    });
  },
};

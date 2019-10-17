import {NotificationState, NotificationStatus,} from '@codesandbox/notifications'

export const notificationState = new NotificationState()

export function convertTypeToStatus(type) {
  switch (type) {
    case 'notice':
      return NotificationStatus.NOTICE
    case 'warning':
      return NotificationStatus.WARNING
    case 'error':
      return NotificationStatus.ERROR
    case 'success':
      return NotificationStatus.SUCCESS
    default:
      return NotificationStatus.NOTICE
  }
}

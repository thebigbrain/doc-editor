"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertTypeToStatus = convertTypeToStatus;
exports.notificationState = void 0;

var _notifications = require("@codesandbox/notifications");

var notificationState = new _notifications.NotificationState();
exports.notificationState = notificationState;

function convertTypeToStatus(type) {
  switch (type) {
    case 'notice':
      return _notifications.NotificationStatus.NOTICE;

    case 'warning':
      return _notifications.NotificationStatus.WARNING;

    case 'error':
      return _notifications.NotificationStatus.ERROR;

    case 'success':
      return _notifications.NotificationStatus.SUCCESS;

    default:
      return _notifications.NotificationStatus.NOTICE;
  }
}
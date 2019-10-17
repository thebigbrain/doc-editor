"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _ = require(".");

var defaults = function defaults() {
  return {
    username: (0, _addonKnobs.text)('Username', 'SaraVieira'),
    avatarUrl: (0, _addonKnobs.text)('avatar url', 'https://avatars0.githubusercontent.com/u/1051509?s=460&v=4')
  };
};

(0, _react2.storiesOf)('components/UserAvatar', module).add('User', function () {
  return _react["default"].createElement(_.UserWithAvatar, defaults());
}).add('With Name', function () {
  return _react["default"].createElement(_.UserWithAvatar, (0, _extends2["default"])({}, defaults(), {
    name: (0, _addonKnobs.text)('name', 'Sara Vieira')
  }));
}).add('With Subscription', function () {
  return _react["default"].createElement(_.UserWithAvatar, (0, _extends2["default"])({}, defaults(), {
    subscriptionSince: (0, _addonKnobs.text)('subscriptionSince', new Date().toString())
  }));
}).add('With hideBadge', function () {
  return _react["default"].createElement(_.UserWithAvatar, (0, _extends2["default"])({}, defaults(), {
    hideBadge: (0, _addonKnobs["boolean"])('hideBadge', true)
  }));
}).add('With useBigName', function () {
  return _react["default"].createElement(_.UserWithAvatar, (0, _extends2["default"])({}, defaults(), {
    useBigName: (0, _addonKnobs["boolean"])('useBigName', true)
  }));
});
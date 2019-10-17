"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _addonKnobs = require("@storybook/addon-knobs");

var _ = require(".");

(0, _react2.storiesOf)('components/Button', module).add('Basic button with text', function () {
  return _react["default"].createElement(_.Button, {
    onClick: (0, _addonActions.action)('onClick')
  }, (0, _addonKnobs.text)('Value', 'Text'));
}).add('Button small', function () {
  return _react["default"].createElement(_.Button, {
    small: (0, _addonKnobs["boolean"])('small', true),
    onClick: (0, _addonActions.action)('onClick')
  }, (0, _addonKnobs.text)('Value', 'Text'));
}).add('Button block', function () {
  return _react["default"].createElement(_.Button, {
    block: (0, _addonKnobs["boolean"])('block', true),
    onClick: (0, _addonActions.action)('onClick')
  }, (0, _addonKnobs.text)('Value', 'Text'));
}).add('Button disabled', function () {
  return _react["default"].createElement(_.Button, {
    disabled: (0, _addonKnobs["boolean"])('disabled', true),
    onClick: (0, _addonActions.action)('onClick')
  }, (0, _addonKnobs.text)('Value', 'Text'));
}).add('Button red', function () {
  return _react["default"].createElement(_.Button, {
    red: (0, _addonKnobs["boolean"])('red', true),
    onClick: (0, _addonActions.action)('onClick')
  }, (0, _addonKnobs.text)('Value', 'Text'));
}).add('Button secondary', function () {
  return _react["default"].createElement(_.Button, {
    secondary: (0, _addonKnobs["boolean"])('secondary', true),
    onClick: (0, _addonActions.action)('onClick')
  }, (0, _addonKnobs.text)('Value', 'Text'));
}).add('Button danger', function () {
  return _react["default"].createElement(_.Button, {
    danger: (0, _addonKnobs["boolean"])('danger', true),
    onClick: (0, _addonActions.action)('onClick')
  }, (0, _addonKnobs.text)('Value', 'Text'));
});
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _addonKnobs = require("@storybook/addon-knobs");

var _ = _interopRequireDefault(require("."));

(0, _react2.storiesOf)('components/Switch', module).add('Switch', function () {
  return _react["default"].createElement(_["default"], {
    onClick: (0, _addonActions.action)('Clikkkk'),
    right: false
  });
}).add('Switch Right', function () {
  return _react["default"].createElement(_["default"], {
    onClick: (0, _addonActions.action)('Clikkkk'),
    right: (0, _addonKnobs["boolean"])('right', true)
  });
}).add('Switch secondary', function () {
  return _react["default"].createElement(_["default"], {
    right: false,
    onClick: (0, _addonActions.action)('Clikkkk'),
    secondary: (0, _addonKnobs["boolean"])('secondary', true)
  });
}).add('Switch offMode', function () {
  return _react["default"].createElement(_["default"], {
    right: false,
    onClick: (0, _addonActions.action)('Clikkkk'),
    offMode: (0, _addonKnobs["boolean"])('offMode', true)
  });
}).add('Switch small', function () {
  return _react["default"].createElement(_["default"], {
    right: false,
    onClick: (0, _addonActions.action)('Clikkkk'),
    small: (0, _addonKnobs["boolean"])('small', true)
  });
});
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _ = _interopRequireDefault(require("."));

(0, _react2.storiesOf)('components/Tooltip', module).add('Tooltip', function () {
  return _react["default"].createElement(_["default"], {
    content: (0, _addonKnobs.text)('Content', 'one')
  }, "Hover me");
});
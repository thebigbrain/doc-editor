"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _ = _interopRequireDefault(require("."));

var stories = (0, _react2.storiesOf)('components/Input', module);
stories.add('Basic AutosizeInput', function () {
  return _react["default"].createElement(_["default"], {
    value: "I am a fancy input"
  });
});
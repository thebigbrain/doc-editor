"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _ = _interopRequireDefault(require("."));

var stories = (0, _react2.storiesOf)('components/ProgressButton', module);
stories.add('Basic ProgressButton', function () {
  return _react["default"].createElement(_["default"], null, "Click Me");
}).add('ProgressButton disabled', function () {
  return _react["default"].createElement(_["default"], {
    disabled: true
  }, "Click Me");
}).add('ProgressButton loading', function () {
  return _react["default"].createElement(_["default"], {
    loading: true
  }, "Click Me");
});
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _ = _interopRequireDefault(require("."));

(0, _react2.storiesOf)('components/Select', module).add('Select', function () {
  return _react["default"].createElement(_["default"], null, _react["default"].createElement("option", null, "one"), _react["default"].createElement("option", null, "two"), _react["default"].createElement("option", null, "three"), _react["default"].createElement("option", null, "four"), _react["default"].createElement("option", null, "five"), _react["default"].createElement("option", null, "six"));
}).add('Select error', function () {
  return _react["default"].createElement(_["default"], {
    error: true
  }, _react["default"].createElement("option", null, "one"), _react["default"].createElement("option", null, "two"), _react["default"].createElement("option", null, "three"), _react["default"].createElement("option", null, "four"), _react["default"].createElement("option", null, "five"), _react["default"].createElement("option", null, "six"));
});
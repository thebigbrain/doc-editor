"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _ = _interopRequireDefault(require("."));

var defaults = function defaults() {
  return {
    viewCount: (0, _addonKnobs.number)('viewCount', 1223),
    likeCount: (0, _addonKnobs.number)('likeCount', 1223),
    forkCount: (0, _addonKnobs.number)('forkCount', 122123123)
  };
};

(0, _react2.storiesOf)('components/Stats', module).add('Stats', function () {
  return _react["default"].createElement(_["default"], defaults());
}).add('Stats with text', function () {
  return _react["default"].createElement(_["default"], (0, _extends2["default"])({}, defaults(), {
    text: true
  }));
}).add('Vertical Stats', function () {
  return _react["default"].createElement(_["default"], (0, _extends2["default"])({}, defaults(), {
    vertical: true
  }));
}).add('Vertical Stats with text', function () {
  return _react["default"].createElement(_["default"], (0, _extends2["default"])({}, defaults(), {
    vertical: true,
    text: true
  }));
});
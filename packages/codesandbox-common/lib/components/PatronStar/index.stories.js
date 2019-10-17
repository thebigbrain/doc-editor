"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _ = require(".");

var stories = (0, _react2.storiesOf)('components/PatronStar', module);
stories.add('Basic PatronStar', function () {
  return _react["default"].createElement(_.PatronStar, null);
}).add('PatronStar with Date', function () {
  return _react["default"].createElement(_.PatronStar, {
    subscriptionSince: new Date()
  });
});
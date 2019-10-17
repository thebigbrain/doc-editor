"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _ = _interopRequireDefault(require("."));

var stories = (0, _react2.storiesOf)('components/GithubBadge', module);
stories.add('Master', function () {
  return _react["default"].createElement(_["default"], {
    username: "CompuIves",
    repo: "codesandbox-client",
    branch: "master"
  });
}).add('Other Branch', function () {
  return _react["default"].createElement(_["default"], {
    username: "CompuIves",
    repo: "codesandbox-client",
    branch: "storybook"
  });
});
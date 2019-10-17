"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _ = _interopRequireDefault(require("."));

var stories = (0, _react2.storiesOf)('components/ContributorsBadge', module);
stories.add('Default', function () {
  return _react["default"].createElement(_["default"], {
    username: (0, _addonKnobs.text)('name', 'SaraVieira')
  });
});
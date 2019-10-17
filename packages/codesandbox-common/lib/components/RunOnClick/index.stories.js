"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _ = _interopRequireDefault(require("."));

var stories = (0, _react2.storiesOf)('components/RunOnClick', module);
stories.add('Basic RunOnClick', function () {
  return _react["default"].createElement(_["default"], {
    onClick: (0, _addonActions.action)('click')
  });
});
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _ = require(".");

/* eslint-disable jsx-a11y/label-has-associated-control */
var stories = (0, _react2.storiesOf)('components/Checkbox', module);
stories.add('Basic Checkbox', function () {
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_.Checkbox, {
    onClick: (0, _addonActions.action)('onClick'),
    onChange: (0, _addonActions.action)('onChange'),
    id: "hello"
  }), _react["default"].createElement("label", {
    htmlFor: "checkbox"
  }, "Hello"));
}).add('Checked Checkbox', function () {
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_.Checkbox, {
    onClick: (0, _addonActions.action)('onClick'),
    onChange: (0, _addonActions.action)('onChange'),
    id: "hello",
    checked: true
  }), _react["default"].createElement("label", {
    htmlFor: "checkbox"
  }, "Hello"));
});
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeDecorator = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _theme = _interopRequireDefault(require("../../theme"));

var ThemeDecorator = function ThemeDecorator(fn) {
  return _react["default"].createElement(_styledComponents.ThemeProvider, {
    theme: _theme["default"]
  }, fn());
};

exports.ThemeDecorator = ThemeDecorator;
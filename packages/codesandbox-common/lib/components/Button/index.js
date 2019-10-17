"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = ButtonComponent;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _elements = require("./elements");

function ButtonComponent(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["style"]);

  // Link
  if (props.to) {
    return _react["default"].createElement(_elements.LinkButton, (0, _extends2["default"])({
      style: style
    }, props));
  }

  if (props.href) {
    return _react["default"].createElement(_elements.AButton, (0, _extends2["default"])({
      style: style
    }, props));
  }

  return _react["default"].createElement(_elements.Button, (0, _extends2["default"])({
    style: style
  }, props));
}
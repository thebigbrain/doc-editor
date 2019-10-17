"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _elements = require("./elements");

function Switch(_ref) {
  var right = _ref.right,
      onClick = _ref.onClick,
      _ref$secondary = _ref.secondary,
      secondary = _ref$secondary === void 0 ? false : _ref$secondary,
      _ref$offMode = _ref.offMode,
      offMode = _ref$offMode === void 0 ? false : _ref$offMode,
      _ref$small = _ref.small,
      small = _ref$small === void 0 ? false : _ref$small,
      className = _ref.className,
      style = _ref.style;
  return _react["default"].createElement(_elements.Container, {
    style: style,
    small: small,
    secondary: secondary,
    offMode: offMode,
    onClick: onClick,
    right: right,
    className: className
  }, _react["default"].createElement(_elements.Dot, {
    small: small,
    right: right
  }));
}

var _default = Switch;
exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _IconBase = _interopRequireDefault(require("react-icons/lib/IconBase"));

var _default = function _default(props) {
  return _react["default"].createElement(_IconBase["default"], (0, _extends2["default"])({
    width: "1em",
    height: "1em",
    viewBox: "0 0 12 12",
    version: "1.1",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, props), _react["default"].createElement("path", {
    d: "M1.5 1.5V7.5H10.5V1.5H1.5ZM1 0H11C11.5523 0 12 0.447715 12 1V11C12 11.5523 11.5523 12 11 12H1C0.447715 12 0 11.5523 0 11V1C0 0.447715 0.447715 0 1 0Z",
    fill: "currentColor"
  }));
};

exports["default"] = _default;
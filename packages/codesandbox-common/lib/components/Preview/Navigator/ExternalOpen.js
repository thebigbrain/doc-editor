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
    d: "M1.50001 0H0L1.43051e-06 6.90909C1.43051e-06 7.50909 0.49091 8 1.09091 8L8.5 8V6.5H1.50001L1.50001 0Z",
    transform: "translate(0 4)",
    fill: "currentColor"
  }), _react["default"].createElement("rect", {
    width: "9.5",
    height: "9.5",
    rx: "1",
    transform: "translate(2.5)",
    fill: "currentColor"
  }));
};

exports["default"] = _default;
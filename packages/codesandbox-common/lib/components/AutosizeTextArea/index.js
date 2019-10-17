"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));

var _Input = _interopRequireDefault(require("../Input"));

var _default = _Input["default"].withComponent(_reactTextareaAutosize["default"]);

exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sha = _interopRequireDefault(require("sha1"));

var _default = function _default(text) {
  return (0, _sha["default"])(text);
};

exports["default"] = _default;
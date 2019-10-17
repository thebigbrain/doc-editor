"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _default = new _template["default"]('unibit', 'Unibit', 'https://www.stackbit.com', 'github/stackbithq/stackbit-theme-universal/tree/master/', (0, _theme.decorateSelector)(function () {
  return '#3EB0FD';
}), {
  distDir: 'public',
  isServer: true,
  popular: true,
  mainFile: ['README.md'],
  showOnHomePage: true,
  main: false,
  showCube: false
});

exports["default"] = _default;
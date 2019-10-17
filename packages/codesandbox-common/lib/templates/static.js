"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _default = new _template["default"]('static', 'Static', 'https://developer.mozilla.org/en-US/docs/Learn/HTML', 'github/codesandbox-app/static-template', (0, _theme.decorateSelector)(function () {
  return '#3AA855';
}), {
  showOnHomePage: true,
  distDir: './',
  main: false,
  mainFile: ['/index.html']
});

exports["default"] = _default;
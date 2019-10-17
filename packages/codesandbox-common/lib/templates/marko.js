"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _default = new _template["default"]('marko', 'Marko', 'https://markojs.com/', 'github/nm123github/marko-codesandbox', (0, _theme.decorateSelector)(function () {
  return '#f5ac00';
}), {
  isServer: true,
  showOnHomePage: true,
  main: false,
  netlify: false
});

exports["default"] = _default;
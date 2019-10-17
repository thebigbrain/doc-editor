"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _default = new _template["default"]('node', 'Node', 'https://codesandbox.io/docs/sse', 'node', (0, _theme.decorateSelector)(function () {
  return '#66cc33';
}), {
  isServer: true,
  showOnHomePage: true,
  main: true,
  netlify: false,
  popular: true,
  mainFile: ['/pages/index.vue', '/pages/index.js', '/src/pages/index.js']
});

exports["default"] = _default;
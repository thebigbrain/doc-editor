"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _default = new _template["default"]('reason', 'Reason', 'https://reasonml.github.io/reason-react/en/', 'reason', (0, _theme.decorateSelector)(function () {
  return '#CB5747';
}), {
  showOnHomePage: true,
  main: false,
  netlify: false,
  mainFile: ['/src/Main.re', 'App.re', 'Index.re']
});

exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _default = new _template["default"]('apollo', 'Apollo', 'https://www.apollographql.com/docs/apollo-server/', 'apollo-server', (0, _theme.decorateSelector)(function () {
  return '#c4198b';
}), {
  isServer: true,
  netlify: false,
  mainFile: ['/src/index.js'],
  showOnHomePage: true
});

exports["default"] = _default;
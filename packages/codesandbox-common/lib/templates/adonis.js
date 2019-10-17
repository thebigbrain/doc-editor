"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _default = new _template["default"]('adonis', 'AdonisJs', 'https://adonisjs.com/', 'github/adonisjs/adonis-starter-codesandbox', (0, _theme.decorateSelector)(function () {
  return '#fff';
}), {
  isServer: true,
  mainFile: ['/start/routes.js'],
  showOnHomePage: true,
  netlify: false
});

exports["default"] = _default;
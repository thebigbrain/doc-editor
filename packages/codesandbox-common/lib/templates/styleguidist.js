"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _configuration = _interopRequireDefault(require("./configuration"));

var _default = new _template["default"]('styleguidist', 'Styleguidist', 'https://react-styleguidist.js.org/', 'github/styleguidist/example', (0, _theme.decorateSelector)(function () {
  return '#25d8fc';
}), {
  extraConfigurations: {
    '/.babelrc': _configuration["default"].babelrc
  },
  isServer: true,
  distDir: 'styleguide',
  mainFile: [],
  showOnHomePage: true
});

exports["default"] = _default;
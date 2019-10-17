"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _configuration = _interopRequireDefault(require("./configuration"));

var _default = new _template["default"]('babel-repl', 'Babel', 'https://github.com/@babel/core', 'babel', (0, _theme.decorateSelector)(function () {
  return '#F5DA55';
}), {
  extraConfigurations: {
    '/.babelrc': _configuration["default"].babelrc,
    '/babel-transpiler.json': _configuration["default"].babelTranspiler
  }
});

exports["default"] = _default;
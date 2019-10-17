"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _configuration = _interopRequireDefault(require("./configuration"));

var _default = new _template["default"]('create-react-app', 'React', 'https://github.com/facebookincubator/create-react-app', 'new', (0, _theme.decorateSelector)(function () {
  return '#61DAFB';
}), {
  showOnHomePage: true,
  popular: true,
  main: true,
  mainFile: ['/src/index.js', '/src/index.tsx', '/src/index.ts'],
  extraConfigurations: {
    '/jsconfig.json': _configuration["default"].jsconfig,
    '/tsconfig.json': _configuration["default"].tsconfig
  }
});

exports["default"] = _default;
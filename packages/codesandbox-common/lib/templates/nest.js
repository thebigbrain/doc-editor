"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _configuration = _interopRequireDefault(require("./configuration"));

var _default = new _template["default"]('nest', 'Nest', 'https://nestjs.com/', 'github/nestjs/typescript-starter', (0, _theme.decorateSelector)(function () {
  return '#ed2945';
}), {
  extraConfigurations: {
    '/tsconfig.json': _configuration["default"].tsconfig
  },
  isServer: true,
  mainFile: ['/src/main.ts'],
  showOnHomePage: true,
  netlify: false
});

exports["default"] = _default;
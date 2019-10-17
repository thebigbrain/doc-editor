"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _configuration = _interopRequireDefault(require("./configuration"));

var _default = new _template["default"]('custom', 'Custom', 'https://codesandbox.io', 'custom', (0, _theme.decorateSelector)(function () {
  return '#F5DA55';
}), {
  extraConfigurations: {
    '/.codesandbox/template.json': _configuration["default"].customCodeSandbox
  }
});

exports["default"] = _default;
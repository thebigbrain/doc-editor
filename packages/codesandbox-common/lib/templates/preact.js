"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _configuration = _interopRequireDefault(require("./configuration"));

var _default = new _template["default"]('preact-cli', 'Preact', 'https://github.com/developit/preact-cli', 'preact', (0, _theme.decorateSelector)(function () {
  return '#AD78DC';
}), {
  showOnHomePage: true,
  extraConfigurations: {
    '/.babelrc': _configuration["default"].babelrc
  }
});

exports["default"] = _default;
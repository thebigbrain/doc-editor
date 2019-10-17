"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _configuration = _interopRequireDefault(require("./configuration"));

var _default = new _template["default"]('nuxt', 'Nuxt.js', 'https://nuxtjs.org/', 'github/nuxt/codesandbox-nuxt', (0, _theme.decorateSelector)(function () {
  return '#3B8070';
}), {
  extraConfigurations: {
    '/.babelrc': _configuration["default"].babelrc
  },
  distDir: 'dist',
  isServer: true,
  popular: true,
  mainFile: ['/pages/index.vue'],
  showOnHomePage: true,
  main: true,
  showCube: false
});

exports["default"] = _default;
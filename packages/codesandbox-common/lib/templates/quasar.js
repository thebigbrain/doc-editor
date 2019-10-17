"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _default = new _template["default"]('quasar-framework', 'Quasar', 'https://quasar-framework.org/', 'github/quasarframework/quasar-codesandbox', (0, _theme.decorateSelector)(function () {
  return '#43A4F2';
}), {
  isServer: true,
  mainFile: ['/src/pages/Index.vue'],
  showOnHomePage: true,
  netlify: false
});

exports["default"] = _default;
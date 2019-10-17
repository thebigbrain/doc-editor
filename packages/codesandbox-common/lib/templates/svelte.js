"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _default = new _template["default"]('svelte', 'Svelte', 'https://svelte.dev', 'svelte', (0, _theme.decorateSelector)(function () {
  return '#FF3E00';
}), {
  showOnHomePage: true,
  showCube: false,
  distDir: 'public',
  mainFile: ['/app.svelte']
});

exports["default"] = _default;
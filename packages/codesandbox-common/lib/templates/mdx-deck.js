"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _default = new _template["default"]('mdx-deck', 'MDX Deck', 'https://github.com/jxnblk/mdx-deck', 'github/jxnblk/mdx-deck/tree/master/templates/basic', (0, _theme.decorateSelector)(function () {
  return '#FAD961';
}), {
  distDir: 'dist',
  isServer: true,
  mainFile: ['deck.mdx'],
  showOnHomePage: true
});

exports["default"] = _default;
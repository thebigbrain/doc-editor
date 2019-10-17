"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _configuration = _interopRequireDefault(require("./configuration"));

var _default = new _template["default"]('next', 'Next.js', 'https://nextjs.org/', 'github/zeit/next.js/tree/master/examples/hello-world', (0, _theme.decorateSelector)(function () {
  return '#ffffff';
}), {
  extraConfigurations: {
    '/.babelrc': _configuration["default"].babelrc
  },
  isServer: true,
  distDir: 'out',
  netlify: false,
  mainFile: ['/pages/index.js'],
  backgroundColor: (0, _theme.decorateSelector)(function () {
    return '#000000';
  }),
  showOnHomePage: true,
  main: true,
  popular: true,
  showCube: false
});

exports["default"] = _default;
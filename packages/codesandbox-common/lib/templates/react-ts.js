"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _configuration = _interopRequireDefault(require("./configuration"));

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _default = new _template["default"]('create-react-app-typescript', 'React + TS', 'https://github.com/wmonk/create-react-app-typescript', 'react-ts', (0, _theme.decorateSelector)(function () {
  return '#009fff';
}), {
  isTypescript: true,
  showOnHomePage: false,
  extraConfigurations: {
    '/tsconfig.json': _configuration["default"].tsconfig
  }
});

exports["default"] = _default;
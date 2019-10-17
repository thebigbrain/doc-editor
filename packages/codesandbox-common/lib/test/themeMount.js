"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _styledComponents = require("styled-components");

var _theme = _interopRequireDefault(require("../theme"));

var mountWithTheme = function mountWithTheme(tree) {
  var WrappingThemeProvider = function WrappingThemeProvider(props) {
    return _react["default"].createElement(_styledComponents.ThemeProvider, {
      theme: _theme["default"]
    }, props.children);
  };

  return (0, _enzyme.mount)(tree, {
    wrappingComponent: WrappingThemeProvider
  });
};

var _default = mountWithTheme;
exports["default"] = _default;
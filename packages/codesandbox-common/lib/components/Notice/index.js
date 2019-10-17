"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: 0.75rem;\n  color: white;\n  padding: 0.125rem 0.2rem;\n  background-image: linear-gradient(\n    45deg,\n    ", " 0%,\n    ", " 100%\n  );\n  border-radius: 4px;\n  float: right;\n  margin-right: 2rem;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var theme = _ref.theme;
  return theme.secondary.darken(0.2);
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.secondary.darken(0.1);
});

exports["default"] = _default;
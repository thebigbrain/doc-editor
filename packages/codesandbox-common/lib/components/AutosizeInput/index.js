"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactInputAutosize = _interopRequireDefault(require("react-input-autosize"));

var _Input = require("../Input");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  input {\n    ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _styledComponents["default"])(_reactInputAutosize["default"])(_templateObject(), _Input.styles);

exports["default"] = _default;
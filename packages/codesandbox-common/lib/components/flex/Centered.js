"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  display: flex;\n  ", ";\n  ", ";\n\n  flex-direction: column;\n  width: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.vertical && 'justify-content: center;';
}, function (props) {
  return props.horizontal && 'align-items: center;';
});

exports["default"] = _default;
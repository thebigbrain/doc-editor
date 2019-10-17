"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = require("styled-components");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    animation: ", " 0.3s;\n    animation-delay: ", "s;\n    animation-fill-mode: forwards;\n    opacity: 0;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  0%   { opacity: 0; }\n  100% { opacity: 1; }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var animation = (0, _styledComponents.keyframes)(_templateObject());

var _default = function _default(delay) {
  return (0, _styledComponents.css)(_templateObject2(), animation, delay);
};

exports["default"] = _default;
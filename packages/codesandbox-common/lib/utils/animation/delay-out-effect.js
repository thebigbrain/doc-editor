"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = require("styled-components");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    animation: ", " 0.3s;\n    animation-delay: ", "s;\n    animation-fill-mode: forwards;\n    opacity: 1;\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  0%   { opacity: 1; transform: translateY(0px); }\n  100% { opacity: 0; transform: translateY(10px); }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  0%   { opacity: 1; transform: translateY(10px); }\n  100% { opacity: 0; transform: translateY(0px); }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var animation = (0, _styledComponents.keyframes)(_templateObject());
var reverseAnimation = (0, _styledComponents.keyframes)(_templateObject2());

var _default = function _default() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return (0, _styledComponents.css)(_templateObject3(), reverse ? reverseAnimation : animation, delay);
};

exports["default"] = _default;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = exports.RelativeButton = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Button = require("../Button");

var _theme = _interopRequireDefault(require("../../theme"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  ", " animation-delay: 0.5s;\n\n  &:before {\n    content: ' ';\n    position: absolute;\n    left: -12px;\n    ", ";\n    animation-delay: 0s;\n  }\n\n  &:after {\n    content: ' ';\n    position: absolute;\n    left: 12px;\n    ", ";\n    animation-delay: 1s;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: ", ";\n  opacity: 0.7;\n  animation: ", " 1s infinite linear alternate;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  0%   { background-color:  ", "; }\n  50%, 100% { background-color: ", "; }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var loaderAnimation = (0, _styledComponents.keyframes)(_templateObject(), _theme["default"].secondary(), _theme["default"].secondary.lighten(0.5)());
var RelativeButton = (0, _styledComponents["default"])(_Button.Button)(_templateObject2());
exports.RelativeButton = RelativeButton;
var circle = (0, _styledComponents.css)(_templateObject3(), _theme["default"].secondary(), loaderAnimation);

var Loader = _styledComponents["default"].div(_templateObject4(), circle, circle, circle);

exports.Loader = Loader;
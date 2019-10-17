"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = exports.StyledFrame = exports.Container = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  animation: ", " 0.2s;\n  animation-fill-mode: forwards;\n  position: absolute;\n  top: 35px;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.75);\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  font-size: 1.5rem;\n  font-weight: 300;\n  color: white;\n  line-height: 1.3;\n  text-align: center;\n\n  z-index: 10;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border-width: 0px;\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  overflow: auto;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  height: 100%;\n  width: 100%;\n  background-color: white;\n\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  0%   { opacity: 0 }\n  100% { opacity: 1 }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var fadeInAnimation = (0, _styledComponents.keyframes)(_templateObject());

var Container = _styledComponents["default"].div(_templateObject2());

exports.Container = Container;

var StyledFrame = _styledComponents["default"].iframe(_templateObject3());

exports.StyledFrame = StyledFrame;

var Loading = _styledComponents["default"].div(_templateObject4(), fadeInAnimation);

exports.Loading = Loading;
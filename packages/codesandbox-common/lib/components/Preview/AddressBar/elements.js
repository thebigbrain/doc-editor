"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputContainer = exports.Container = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  input {\n    border-radius: 4px;\n    outline: none;\n    /* border: 1px solid #ccc; */\n    border: 0px solid transparent;\n    padding: 0.2rem 0.5rem;\n    color: black;\n    width: 100%;\n    color: ", ";\n    box-sizing: border-box;\n    background-color: ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  color: ", ";\n  vertical-align: middle;\n  font-size: 1rem;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Container = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.gray.darken(0.2)();
});

exports.Container = Container;

var InputContainer = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.theme['input.foreground'] || 'rgba(255, 255, 255, 0.8)';
}, function (props) {
  return props.theme['input.background'] || props.theme.background4;
});

exports.InputContainer = InputContainer;
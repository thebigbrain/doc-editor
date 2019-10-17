"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dot = exports.Container = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  transition: inherit;\n  position: absolute;\n  height: ", "px;\n  width: 1rem;\n  left: 0.1rem;\n  border-radius: 4px;\n  transform: translateX(", ");\n  top: 0.1rem;\n  background-color: white;\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  transition: 0.3s ease all;\n  position: relative;\n  background-color: ", ";\n  width: ", "rem;\n  color: rgba(0, 0, 0, 0.5);\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 0.5rem;\n  height: ", "px;\n  box-sizing: border-box;\n  cursor: pointer;\n  border-radius: 4px;\n\n  &:before,\n  &:after {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5em;\n    line-height: 1;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var getColor = function getColor(_ref) {
  var right = _ref.right,
      offMode = _ref.offMode,
      secondary = _ref.secondary,
      givenTheme = _ref.theme;

  if (right) {
    return secondary ? givenTheme.templateColor || givenTheme.secondary : givenTheme.primary;
  }

  if (offMode) return "rgba(0, 0, 0, 0.3)";
  return secondary ? givenTheme.primary : givenTheme.templateColor || givenTheme.secondary;
};

var Container = _styledComponents["default"].div(_templateObject(), getColor, function (_ref2) {
  var small = _ref2.small;
  return small ? 3 : 3.5;
}, function (props) {
  return props.small ? 20 : 26;
});

exports.Container = Container;

var getSize = function getSize(_ref3) {
  var small = _ref3.small;
  return small ? 'calc(1.5rem + 2px)' : 'calc(2rem + 2px)';
};

var Dot = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.small ? 14 : 20;
}, function (props) {
  return props.right ? getSize(props) : '0';
});

exports.Dot = Dot;
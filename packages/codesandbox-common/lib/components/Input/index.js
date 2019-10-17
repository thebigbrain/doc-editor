"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TextArea = exports.styles = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  transition: 0.3s ease border-color;\n  background-color: ", ";\n  color: ", ";\n  border: none;\n  outline: none;\n  border-radius: 4px;\n  padding: 0.25em;\n  width: ", ";\n  box-sizing: border-box;\n\n  border: 1px solid\n    ", ";\n\n  &:focus {\n    border-color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var styles = (0, _styledComponents.css)(_templateObject(), function (props) {
  return props.theme['input.background'] || 'rgba(0, 0, 0, 0.3)';
}, function (props) {
  return props.theme['input.foreground'] || (props.theme.light ? '#636363' : 'white');
}, function (_ref) {
  var block = _ref.block,
      fullWidth = _ref.fullWidth;
  return block || fullWidth ? '100%' : 'inherit';
}, function (props) {
  return props.error ? props.theme.red.clearer(0.5) : 'rgba(0, 0, 0, 0.1)';
}, function (props) {
  return props.theme.secondary.clearer(0.6);
});
exports.styles = styles;

var Input = _styledComponents["default"].input(_templateObject2(), styles);

var TextArea = _styledComponents["default"].textarea(_templateObject3(), styles);

exports.TextArea = TextArea;
var _default = Input;
exports["default"] = _default;
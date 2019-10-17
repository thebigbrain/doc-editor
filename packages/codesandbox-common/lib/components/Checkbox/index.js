"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkbox = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-image: none;\n  border: 2px solid transparent;\n  background: ", "\n    url('') no-repeat 50%/10px;\n\n  box-shadow: none;\n  display: inline-block;\n  border-radius: 3.5px;\n  width: 16px;\n  height: 16px;\n  vertical-align: middle;\n  margin-right: 0.75rem;\n  transition: 0.15s ease all;\n  appearance: none;\n\n  &:focus,\n  &:active {\n    border-color: ", ";\n  }\n\n  &:checked {\n    background: ", " url('') no-repeat 50%/10px;\n    border-color: ", ";\n    background-image: url(\"", "\");\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var svg = "data:image/svg+xml;utf8,<svg viewBox='0 0 10 9' xmlns='http://www.w3.org/2000/svg'><path d='M1 4.88l2.378 2.435L9.046 1.6' stroke-width='1.6' stroke='%23FFF' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'/></svg>";

var CheckBoxStyled = _styledComponents["default"].input(_templateObject(), function (props) {
  return props.theme.light ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
}, function (props) {
  return props.theme.shySecondary;
}, function (props) {
  return props.theme.shySecondary;
}, function (props) {
  return props.theme.shySecondary;
}, encodeURIComponent(svg));

var Checkbox = function Checkbox(props) {
  return _react["default"].createElement(CheckBoxStyled, (0, _extends2["default"])({
    type: "checkbox"
  }, props));
};

exports.Checkbox = Checkbox;
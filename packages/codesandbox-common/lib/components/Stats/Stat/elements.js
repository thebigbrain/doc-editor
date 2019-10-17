"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CenteredText = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      justify-content: center;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n  align-items: center;\n  display: inline-flex;\n  flex-direction: row;\n  margin-bottom: 0.5rem;\n\n  width: ", ";\n\n  svg {\n    opacity: 0.75;\n    font-size: 1.125em;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var CenteredText = _styledComponents["default"].div(_templateObject(), function (props) {
  return !props.disableCenter && (0, _styledComponents.css)(_templateObject2());
}, function (props) {
  return props.text ? '10em' : '5em';
});

exports.CenteredText = CenteredText;
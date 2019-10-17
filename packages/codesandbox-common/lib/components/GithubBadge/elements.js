"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledA = exports.Icon = exports.Text = exports.BorderRadius = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  text-decoration: none;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  padding: 3px 5px;\n  background-color: #4f5459;\n  border-radius: 2px;\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n\n  color: ", ";\n  border-radius: 4px;\n  padding: 3px 5px;\n\n  &:hover {\n    color: rgba(255, 255, 255, 0.6);\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      &:hover {\n        background-color: #4f5459;\n      }\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  transition: 0.3s ease all;\n  border-radius: 4px;\n  border: 1px solid #4f5459;\n  font-size: 0.75em;\n  margin-right: 1rem;\n\n  display: flex;\n\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var BorderRadius = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.hasUrl && (0, _styledComponents.css)(_templateObject2());
});

exports.BorderRadius = BorderRadius;

var Text = _styledComponents["default"].span(_templateObject3(), function (props) {
  return props.theme.light ? '#636363' : 'rgba(255, 255, 255, 0.6)';
});

exports.Text = Text;

var Icon = _styledComponents["default"].span(_templateObject4(), function (props) {
  return props.theme.background;
});

exports.Icon = Icon;

var StyledA = _styledComponents["default"].a(_templateObject5());

exports.StyledA = StyledA;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteIcon = exports.Container = exports.TagContainer = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _clear = _interopRequireDefault(require("react-icons/lib/md/clear"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  transition: 0.3s ease all;\n  position: absolute;\n  right: 0.3rem;\n  top: 0;\n  bottom: 0;\n\n  margin: auto;\n  cursor: pointer;\n  color: rgba(255, 255, 255, 0.5);\n\n  &:hover {\n    color: white;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      padding-right: 1.5rem;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  color: white;\n  background-color: ", ";\n  padding: 0.3em 0.5em;\n  border-radius: 4px;\n  font-weight: 500;\n\n  ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  margin-left: -0.2rem;\n  margin-right: -0.2rem;\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var TagContainer = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.align === 'right' && "justify-content: flex-end;";
});

exports.TagContainer = TagContainer;

var Container = _styledComponents["default"].span(_templateObject2(), function (props) {
  return props.theme.secondary;
}, function (props) {
  return props.canRemove && (0, _styledComponents.css)(_templateObject3());
});

exports.Container = Container;
var DeleteIcon = (0, _styledComponents["default"])(_clear["default"])(_templateObject4());
exports.DeleteIcon = DeleteIcon;
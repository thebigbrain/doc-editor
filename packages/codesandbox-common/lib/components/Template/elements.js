"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconContainer = exports.Title = exports.Button = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _color = _interopRequireDefault(require("color"));

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: center;\n  margin-right: 0.75em;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: -webkit-box;\n  max-height: 32px; /* fallback */\n  font-family: Poppins, Roboto, sans-serif;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 16px; /* fallback */\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 2; /* number of lines to show */\n  -webkit-box-orient: vertical;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n          &:hover,\n          &:focus {\n            border-color: rgba(255, 255, 255, 0.1);\n            color: white;\n            background-color: ", ";\n          }\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n          border-color: rgba(255, 255, 255, 0.2);\n          background-color: ", ";\n          color: ", ";\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    display: flex;\n    align-items: center;\n    padding: 1em;\n    border: 2px solid rgba(0, 0, 0, 0.3);\n    border-radius: 4px;\n    background-color: rgba(0, 0, 0, 0.2);\n    color: ", ";\n    text-align: left;\n    transition: 0.3s ease all;\n    cursor: pointer;\n    outline: none;\n\n    ", ";\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var makeColor = function makeColor(color, custom, checkContrast, theme) {
  if (!custom) {
    return color;
  }

  if (checkContrast && theme) {
    return color.contrast((0, _color["default"])('#fff')) < 6.5 ? color.string() : theme.gray();
  }

  return color.string();
};

var Button = _styledComponents["default"].button(_templateObject(), function (_ref) {
  var color = _ref.jsColor,
      selected = _ref.selected,
      custom = _ref.custom,
      theme = _ref.theme;
  return (0, _styledComponents.css)(_templateObject2(), makeColor(color, custom, true, theme), selected ? (0, _styledComponents.css)(_templateObject3(), makeColor(color.clearer(0.3), custom, false), makeColor(color, custom, true, theme)) : (0, _styledComponents.css)(_templateObject4(), makeColor(color.clearer(0.6), custom, false)));
});

exports.Button = Button;

var Title = _styledComponents["default"].div(_templateObject5());

exports.Title = Title;

var IconContainer = _styledComponents["default"].div(_templateObject6());

exports.IconContainer = IconContainer;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyTemplate = exports.TemplateSubTitle = exports.TemplateTitle = exports.Border = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _elements = require("../SandboxCard/elements");

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    position: relative;\n    width: 203.5px;\n    min-width: 203.5px;\n    padding: 0;\n    border: 2px solid ", ";\n    border-radius: 4px;\n    background: ", ";\n    color: ", ";\n    cursor: pointer;\n    box-sizing: border-box;\n    overflow: hidden;\n\n    &:focus {\n      border: 2px solid ", ";\n      outline: none;\n    }\n\n    img {\n      display: block;\n      max-width: 100%;\n    }\n\n    ", " {\n      height: ", "px;\n      text-align: left;\n    }\n\n    &:hover {\n      ", " {\n        opacity: 1;\n      }\n    }\n  "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    display: block;\n    width: 100%;\n    height: 16px;\n    padding: 0 12px;\n    margin-bottom: 6px;\n    color: ", ";\n    font-size: 12px;\n    text-align: left;\n    line-height: 16px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    box-sizing: border-box;\n  "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: block;\n  width: 100%;\n  margin: 6px 12px;\n  font-family: Poppins, Roboto, sans-serif;\n  font-size: 12px;\n  font-weight: 500;\n  text-align: left;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    position: relative;\n    top: -4px;\n    width: 100%;\n    height: 4px;\n    background: ", ";\n  "]);

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

var Border = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? "none" : _ref$color;
  return (0, _styledComponents.css)(_templateObject2(), color);
});

exports.Border = Border;

var TemplateTitle = _styledComponents["default"].span(_templateObject3());

exports.TemplateTitle = TemplateTitle;

var TemplateSubTitle = _styledComponents["default"].span(_templateObject4(), function (_ref2) {
  var theme = _ref2.theme;
  return (0, _styledComponents.css)(_templateObject5(), theme.placeholder);
});

exports.TemplateSubTitle = TemplateSubTitle;

var MyTemplate = _styledComponents["default"].button(_templateObject6(), function (_ref3) {
  var theme = _ref3.theme,
      overlayHeight = _ref3.overlayHeight;
  return (0, _styledComponents.css)(_templateObject7(), theme.background5, theme.background2, theme.lightText, theme.secondary, _elements.Overlay, overlayHeight, _elements.Overlay);
});

exports.MyTemplate = MyTemplate;
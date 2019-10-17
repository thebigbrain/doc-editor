"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledStats = exports.IconContainer = exports.Author = exports.Description = exports.Title = exports.SandboxInfo = exports.SandboxContainer = exports.SandboxPreviewImage = exports.Container = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _UserWithAvatar = require("../UserWithAvatar");

var _theme = _interopRequireDefault(require("../../theme"));

var _index = _interopRequireDefault(require("../Stats/index"));

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-weight: 600;\n  margin-top: 1em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  position: absolute;\n  right: 1.5em;\n  bottom: 1.5em;\n\n  img {\n    width: 40px;\n    height: 40px;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  left: 1.5em;\n  bottom: 1.5em;\n  color: ", ";\n  font-weight: 600;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-family: 'Poppins', sans-serif;\n  font-weight: 600;\n  font-size: 1em;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 0.5em;\n  font-family: 'Poppins', sans-serif;\n  font-weight: 600;\n  font-size: 2.125em;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  max-height: 8rem;\n  overflow: hidden;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  max-width: 400px;\n  text-align: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  display: flex;\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n\n  @media screen and (max-width: ", "px) {\n    height: 230px;\n    z-index: 11;\n    background-color: ", ";\n    padding: 0.5em;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n\n  @media screen and (max-width: ", "px) {\n    /* Manually measured using the devtools, probably (height / 2 - navigation bar size) */\n    height: 257.5px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  transition: 0.3s ease background-color;\n\n  position: relative;\n  background-color: ", ";\n  border-radius: 8px;\n  color: ", ";\n  height: ", "px;\n  display: flex;\n  box-shadow: 0 9px 14px rgba(0, 0, 0, 0.25);\n  overflow: hidden;\n  z-index: 1;\n\n  cursor: pointer;\n\n  &:hover {\n    background-color: ", ";\n  }\n\n  @media screen and (max-width: ", "px) {\n    flex-direction: column;\n    min-height: 800px;\n\n    font-size: 0.875em;\n\n    h1 {\n      font-size: 1.25em;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var VERTICAL_BREAKPOINT = 900;

var Container = _styledComponents["default"].div(_templateObject(), _theme["default"]["new"].bg, _theme["default"]["new"].title, function (props) {
  return props.height || 500;
}, function (props) {
  return props.theme["new"].bg.lighten(0.2);
}, VERTICAL_BREAKPOINT);

exports.Container = Container;

var SandboxPreviewImage = _styledComponents["default"].div(_templateObject2(), VERTICAL_BREAKPOINT);

exports.SandboxPreviewImage = SandboxPreviewImage;

var SandboxContainer = _styledComponents["default"].div(_templateObject3(), VERTICAL_BREAKPOINT, _theme["default"]["new"].bg);

exports.SandboxContainer = SandboxContainer;

var SandboxInfo = _styledComponents["default"].div(_templateObject4());

exports.SandboxInfo = SandboxInfo;

var Title = _styledComponents["default"].h1(_templateObject5());

exports.Title = Title;

var Description = _styledComponents["default"].p(_templateObject6(), _theme["default"]["new"].description);

exports.Description = Description;
var Author = (0, _styledComponents["default"])(_UserWithAvatar.UserWithAvatar)(_templateObject7(), _theme["default"]["new"].description);
exports.Author = Author;

var IconContainer = _styledComponents["default"].div(_templateObject8());

exports.IconContainer = IconContainer;
var StyledStats = (0, _styledComponents["default"])(_index["default"])(_templateObject9(), _theme["default"]["new"].description);
exports.StyledStats = StyledStats;
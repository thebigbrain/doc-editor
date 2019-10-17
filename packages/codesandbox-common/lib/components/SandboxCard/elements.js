"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = exports.SandboxStats = exports.Avatar = exports.Stats = exports.Author = exports.TemplateIcon = exports.SandboxInfo = exports.SandboxImage = exports.SandboxDescription = exports.SandboxTitle = exports.Container = exports.Overlay = exports.BG_HOVER = exports.BG_COLOR = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _UserWithAvatar = require("../UserWithAvatar");

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  font-size: 10px;\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  padding: 0.75rem;\n  justify-content: space-between;\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 1rem;\n  height: 1rem;\n  border-radius: 4px;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  list-style: none;\n  padding: 0;\n  display: flex;\n  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;\n  font-size: 12px;\n  line-height: 16px;\n  display: flex;\n  align-items: center;\n\n  color: ", ";\n\n  li:not(:last-child) {\n    margin-right: 8px;\n  }\n\n  li {\n    display: flex;\n    align-items: center;\n\n    svg {\n      margin-right: 6px;\n      width: 16px;\n      color: ", ";\n    }\n  }\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-decoration: none;\n  color: ", ";\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  left: -1px;\n  right: -1px;\n  padding: 0.75rem;\n  padding-bottom: 4px;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: block;\n  margin-bottom: 0;\n  z-index: 0;\n  border-bottom: 3px solid ", ";\n  height: auto;\n  width: 100%;\n  background-color: ", ";\n  border-image-width: 0;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: 0.8rem;\n  color: ", ";\n  font-weight: 500;\n  line-height: 1.3;\n  margin: 0;\n  margin-bottom: 16px;\n  font-size: 12px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-family: 'Poppins', sans-serif;\n  font-size: 0.75rem;\n  font-weight: 600;\n  margin-bottom: 6px;\n  margin-top: 0;\n\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 1;\n  max-height: 20px;\n\n  word-break: break-all;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      margin: 0;\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      min-width: auto;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  transition: 0.3s ease all;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  position: relative;\n  flex: 1;\n  min-width: 300px;\n\n  flex-grow: 1;\n  width: 100%;\n  border-radius: 4px;\n  overflow: hidden;\n  cursor: pointer;\n\n  margin-right: 0.5rem;\n  margin-left: 0.5rem;\n\n  background-color: ", ";\n  box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);\n\n  ", ";\n\n  ", ";\n\n  &:hover {\n    ", " {\n      opacity: 1;\n    }\n  }\n\n  &:hover {\n    background-color: ", ";\n    transform: translateY(-5px);\n    box-shadow: 0 8px 4px rgba(0, 0, 0, 0.3);\n  }\n\n  &:last-child {\n    flex-grow: 0;\n    min-width: calc(33% - 1rem);\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  background: rgba(28, 32, 34, 0.9);\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: calc(100% - 3px);\n  padding: 1rem;\n  box-sizing: border-box;\n  opacity: 0;\n  transition: opacity 200ms ease;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var BG_COLOR = '#1C2022';
exports.BG_COLOR = BG_COLOR;
var BG_HOVER = '#212629';
exports.BG_HOVER = BG_HOVER;

var Overlay = _styledComponents["default"].div(_templateObject());

exports.Overlay = Overlay;

var Container = _styledComponents["default"].div(_templateObject2(), BG_COLOR, function (props) {
  return props.small && (0, _styledComponents.css)(_templateObject3());
}, function (props) {
  return props.noMargin && (0, _styledComponents.css)(_templateObject4());
}, Overlay, BG_HOVER);

exports.Container = Container;

var SandboxTitle = _styledComponents["default"].h2(_templateObject5(), function (props) {
  return props.color;
});

exports.SandboxTitle = SandboxTitle;

var SandboxDescription = _styledComponents["default"].p(_templateObject6(), function (props) {
  return props.theme.lightText;
});

exports.SandboxDescription = SandboxDescription;

var SandboxImage = _styledComponents["default"].img(_templateObject7(), function (props) {
  return props.color;
}, BG_HOVER);

exports.SandboxImage = SandboxImage;

var SandboxInfo = _styledComponents["default"].div(_templateObject8());

exports.SandboxInfo = SandboxInfo;

var TemplateIcon = _styledComponents["default"].div(_templateObject9());

exports.TemplateIcon = TemplateIcon;
var Author = (0, _styledComponents["default"])(_UserWithAvatar.UserWithAvatar)(_templateObject10(), function (props) {
  return props.theme["new"].description;
});
exports.Author = Author;

var Stats = _styledComponents["default"].ul(_templateObject11(), function (props) {
  return props.theme.placeholder;
}, function (props) {
  return props.theme.placeholder.darken(0.3);
});

exports.Stats = Stats;

var Avatar = _styledComponents["default"].img(_templateObject12());

exports.Avatar = Avatar;

var SandboxStats = _styledComponents["default"].div(_templateObject13());

exports.SandboxStats = SandboxStats;

var Image = _styledComponents["default"].div(_templateObject14());

exports.Image = Image;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = exports.Username = exports.Names = exports.AuthorName = exports.CenteredText = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 1.75em;\n  height: 1.75em;\n  border-radius: 8px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      opacity: 0.7;\n      font-size: 0.75em;\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-flex;\n\n  flex-direction: column;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      margin: 0 0.75em;\n      font-size: 1rem;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-flex;\n  align-items: center;\n  margin: 0 0.75em;\n\n  ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: row;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var CenteredText = _styledComponents["default"].div(_templateObject());

exports.CenteredText = CenteredText;

var AuthorName = _styledComponents["default"].span(_templateObject2(), function (props) {
  return props.useBigName && (0, _styledComponents.css)(_templateObject3());
});

exports.AuthorName = AuthorName;

var Names = _styledComponents["default"].div(_templateObject4());

exports.Names = Names;

var Username = _styledComponents["default"].div(_templateObject5(), function (props) {
  return props.hasTwoNames && (0, _styledComponents.css)(_templateObject6());
});

exports.Username = Username;

var Image = _styledComponents["default"].img(_templateObject7());

exports.Image = Image;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchContainer = exports.AddressBarContainer = exports.Icon = exports.Icons = exports.Container = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  flex: 0 0 3.5rem;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 100%;\n  box-sizing: border-box;\n  margin: 0 0.5rem;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      color: ", ";\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  border: none;\n  background-color: transparent;\n  color: ", ";\n  font-size: 1.5rem;\n  line-height: 0.5;\n  margin: 0 0.1rem;\n  vertical-align: middle;\n  text-align: center;\n  padding: 0;\n  outline: none;\n\n  ", ";\n\n  ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  background-color: ", ";\n  padding: 0.5rem;\n  align-items: center;\n  line-height: 1;\n  /* box-shadow: 0 1px 3px #ddd; */\n  height: 35px;\n  min-height: 35px;\n  box-sizing: border-box;\n  z-index: 2;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Container = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme['editor.background'] || props.theme.background();
});

exports.Container = Container;

var Icons = _styledComponents["default"].div(_templateObject2());

exports.Icons = Icons;

var Icon = _styledComponents["default"].button(_templateObject3(), function (props) {
  return props.disabled ? props.theme.light ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)' : props.theme.light ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.6)';
}, function (props) {
  return !props.disabled && "\n    &:hover {\n      cursor: pointer;\n      color: ".concat(props.theme.light ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)', ";\n    }");
}, function (props) {
  return props.selected && (0, _styledComponents.css)(_templateObject4(), props.theme.templateColor || props.theme.secondary);
});

exports.Icon = Icon;

var AddressBarContainer = _styledComponents["default"].div(_templateObject5());

exports.AddressBarContainer = AddressBarContainer;

var SwitchContainer = _styledComponents["default"].div(_templateObject6());

exports.SwitchContainer = SwitchContainer;
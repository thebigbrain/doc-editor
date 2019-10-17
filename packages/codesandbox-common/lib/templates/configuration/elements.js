"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigDescription = exports.ConfigValue = exports.ConfigName = exports.ConfigItem = exports.PaddedConfig = exports.PaddedPreference = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Preference = _interopRequireDefault(require("../../components/Preference"));

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-top: 0.25rem;\n  font-weight: 500;\n  color: ", ";\n  opacity: 0.8;\n  font-size: 0.875rem;\n  max-width: 75%;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])([""]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  flex: 1;\n  font-weight: 400;\n\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding-bottom: 0.75rem;\n  margin-bottom: 0.75rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 100%;\n  padding: 0;\n  font-weight: 400;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var PaddedPreference = (0, _styledComponents["default"])(_Preference["default"])(_templateObject());
exports.PaddedPreference = PaddedPreference;

var PaddedConfig = _styledComponents["default"].div(_templateObject2());

exports.PaddedConfig = PaddedConfig;

var ConfigItem = _styledComponents["default"].div(_templateObject3());

exports.ConfigItem = ConfigItem;

var ConfigName = _styledComponents["default"].span(_templateObject4(), function (props) {
  return props.theme['sideBar.foreground'] || 'inherit';
});

exports.ConfigName = ConfigName;

var ConfigValue = _styledComponents["default"].div(_templateObject5());

exports.ConfigValue = ConfigValue;

var ConfigDescription = _styledComponents["default"].div(_templateObject6(), function (props) {
  return props.theme['sideBar.foreground'] || 'inherit';
});

exports.ConfigDescription = ConfigDescription;
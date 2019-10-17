"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _OfficialTemplate = require("./OfficialTemplate");

var _UserTemplate = require("./UserTemplate");

var _default = function _default(props) {
  return props.template.niceName ? _react["default"].createElement(_OfficialTemplate.OfficialTemplate, props) : _react["default"].createElement(_UserTemplate.UserTemplate, props);
};

exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Margin = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _getSpacing = _interopRequireDefault(require("./get-spacing"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin: ", ";\n  box-sizing: border-box;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Margin = _styledComponents["default"].div(_templateObject(), _getSpacing["default"]);

exports.Margin = Margin;
var _default = Margin;
exports["default"] = _default;
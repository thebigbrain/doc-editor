"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _react2 = _interopRequireDefault(require("@tippy.js/react"));

var _theme = _interopRequireDefault(require("../../theme"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .tippy-backdrop {\n    background-color: rgb(21, 24, 25);\n  }\n\n  .tippy-tooltip.update-theme {\n    background-color: ", ";\n    border-radius: 2px;\n    padding: 0;\n\n    .tippy-arrow {\n      border-bottom-color: ", ";\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var GlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject(), _theme["default"].green(), _theme["default"].green());

var Tooltip = function Tooltip(_ref) {
  var children = _ref.children,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      content = _ref.content,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["children", "style", "content"]);
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(GlobalStyle, null), _react["default"].createElement(_react2["default"], (0, _extends2["default"])({
    delay: [500, 0],
    content: content
  }, props), _react["default"].createElement("span", {
    style: _objectSpread({
      outlineColor: 'transparent'
    }, style)
  }, children)));
};

var _default = Tooltip;
exports["default"] = _default;
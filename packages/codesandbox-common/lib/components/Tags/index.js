"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Margin = _interopRequireDefault(require("../spacing/Margin"));

var _elements = require("./elements");

var _Tag = _interopRequireDefault(require("./Tag"));

/* @flow */
function Tags(_ref) {
  var tags = _ref.tags,
      align = _ref.align,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["tags", "align"]);
  return _react["default"].createElement(_elements.TagContainer, (0, _extends2["default"])({
    align: align || 'left'
  }, props), tags.slice().sort().map(function (tag) {
    return _react["default"].createElement(_Margin["default"], {
      key: tag,
      vertical: 0.5,
      horizontal: 0.2
    }, _react["default"].createElement(_Tag["default"], {
      tag: tag
    }));
  }));
}

var _default = Tags;
exports["default"] = _default;
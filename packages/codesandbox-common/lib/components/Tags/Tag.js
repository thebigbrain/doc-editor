"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Tag;

var _react = _interopRequireDefault(require("react"));

var _elements = require("./elements");

function Tag(_ref) {
  var tag = _ref.tag,
      removeTag = _ref.removeTag;
  return _react["default"].createElement(_elements.Container, {
    canRemove: Boolean(removeTag)
  }, tag, removeTag && _react["default"].createElement(_elements.DeleteIcon, {
    onClick: function onClick() {
      removeTag({
        tag: tag
      });
    }
  }));
}
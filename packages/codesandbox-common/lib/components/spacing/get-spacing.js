"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(_ref) {
  var margin = _ref.margin,
      top = _ref.top,
      right = _ref.right,
      left = _ref.left,
      bottom = _ref.bottom,
      horizontal = _ref.horizontal,
      vertical = _ref.vertical;
  var topMargin = [top, vertical, margin].find(function (s) {
    return s != null;
  }) || 0;
  var rightMargin = [right, horizontal, margin].find(function (s) {
    return s != null;
  }) || 0;
  var bottomMargin = [bottom, vertical, margin].find(function (s) {
    return s != null;
  }) || 0;
  var leftMargin = [left, horizontal, margin].find(function (s) {
    return s != null;
  }) || 0;
  return "".concat(topMargin, "rem ").concat(rightMargin, "rem ").concat(bottomMargin, "rem ").concat(leftMargin, "rem");
}
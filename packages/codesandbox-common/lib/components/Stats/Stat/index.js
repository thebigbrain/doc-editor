"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _elements = require("./elements");

function format(count) {
  if (count >= 1000000) {
    return "".concat((count / 1000000).toFixed(1), "M");
  }

  if (count >= 1000) {
    return "".concat((count / 1000).toFixed(1), "k");
  }

  return "".concat(count);
}

function Stat(_ref) {
  var Icon = _ref.Icon,
      text = _ref.text,
      textOne = _ref.textOne,
      count = _ref.count,
      vertical = _ref.vertical;
  return _react["default"].createElement(_elements.CenteredText, {
    text: text,
    disableCenter: vertical
  }, Icon, _react["default"].createElement("span", {
    style: {
      marginLeft: '0.5em'
    }
  }, format(count), " ", text && (count === 1 ? textOne || text : text)));
}

var _default = Stat;
exports["default"] = _default;
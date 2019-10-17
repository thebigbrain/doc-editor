"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Badge = _interopRequireDefault(require("./Badge"));

var DEFAULT_BADGE = {
  id: 'patron_1',
  name: 'Patron I',
  visible: true
};

var PatronBadge = function PatronBadge(_ref) {
  var size = _ref.size,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["size"]);
  return _react["default"].createElement(_Badge["default"], (0, _extends2["default"])({}, props, {
    badge: DEFAULT_BADGE,
    size: size
  }));
};

var _default = PatronBadge;
exports["default"] = _default;
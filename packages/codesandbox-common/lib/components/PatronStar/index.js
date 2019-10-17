"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatronStar = PatronStar;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _dateFns = require("date-fns");

var _star = _interopRequireDefault(require("react-icons/lib/go/star"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _elements = require("./elements");

function PatronStar(_ref) {
  var subscriptionSince = _ref.subscriptionSince,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["subscriptionSince"]);
  return _react["default"].createElement(_Tooltip["default"], {
    content: "Patron since ".concat((0, _dateFns.format)(new Date(subscriptionSince), 'MMM yyyy'))
  }, _react["default"].createElement(_elements.Container, null, _react["default"].createElement(_star["default"], props)));
}
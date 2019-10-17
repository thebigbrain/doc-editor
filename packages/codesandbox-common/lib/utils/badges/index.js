"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getBadge;

var _patron = _interopRequireDefault(require("./svg/patron-4.svg"));

var _patron2 = _interopRequireDefault(require("./svg/patron-3.svg"));

var _patron3 = _interopRequireDefault(require("./svg/patron-2.svg"));

var _patron4 = _interopRequireDefault(require("./svg/patron-1.svg"));

/* @flow */
function getBadge(badgeId) {
  if (badgeId === 'patron_4') return _patron["default"];
  if (badgeId === 'patron_3') return _patron2["default"];
  if (badgeId === 'patron_2') return _patron3["default"];
  if (badgeId === 'patron_1') return _patron4["default"];
  return '';
}
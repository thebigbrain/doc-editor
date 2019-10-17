"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _patron = _interopRequireDefault(require("./svg/patron-1.svg"));

var _patron2 = _interopRequireDefault(require("./svg/patron-2.svg"));

var _patron3 = _interopRequireDefault(require("./svg/patron-3.svg"));

var _patron4 = _interopRequireDefault(require("./svg/patron-4.svg"));

var info = {
  'patron-1': {
    Badge: _patron["default"],
    particleCount: 10,
    colors: ['#1BB978']
  },
  'patron-2': {
    Badge: _patron2["default"],
    particleCount: 20,
    colors: ['#B53D3D', '#1BB978']
  },
  'patron-3': {
    Badge: _patron3["default"],
    particleCount: 35,
    colors: ['#609AC3', '#1BB978', '#B53D3D']
  },
  'patron-4': {
    Badge: _patron4["default"],
    particleCount: 100,
    colors: ['#D0AF72', '#1BB978', '#B53D3D', '#609AC3']
  }
}; // Preload the images

Object.keys(info).forEach(function (badge) {
  new Image().src = info[badge].Badge;
});
var _default = info;
exports["default"] = _default;
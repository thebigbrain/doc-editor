"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _imageExtensions = _interopRequireDefault(require("image-extensions/image-extensions.json"));

var path = _interopRequireWildcard(require("./path"));

var exts = new Set(_imageExtensions["default"]);

var _default = function _default(filepath) {
  return exts.has(path.extname(filepath).slice(1).toLowerCase());
};

exports["default"] = _default;
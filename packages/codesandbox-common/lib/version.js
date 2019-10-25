"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getTimestamp = void 0;
// This is .js for preval
var versionType = "PROD";
var versionNumber = Math.floor(1571989055184 / 1000);
var shortCommitSha = "d22830c";

var getTimestamp = function getTimestamp(version) {
  return +version.split('-')[1];
};

exports.getTimestamp = getTimestamp;
var _default = "PROD-1571989055-d22830c";
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getTimestamp = void 0;
// This is .js for preval
var versionType = "PROD";
var versionNumber = Math.floor(1571730171986 / 1000);
var shortCommitSha = "c9d5019";

var getTimestamp = function getTimestamp(version) {
  return +version.split('-')[1];
};

exports.getTimestamp = getTimestamp;
var _default = "PROD-1571730171-c9d5019";
exports["default"] = _default;
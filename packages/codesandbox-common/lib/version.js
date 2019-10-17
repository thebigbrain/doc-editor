"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getTimestamp = void 0;
// This is .js for preval
var versionType = "PROD";
var versionNumber = Math.floor(1571305355420 / 1000);
var shortCommitSha = "c43ce5c";

var getTimestamp = function getTimestamp(version) {
  return +version.split('-')[1];
};

exports.getTimestamp = getTimestamp;
var _default = "PROD-1571305355-c43ce5c";
exports["default"] = _default;
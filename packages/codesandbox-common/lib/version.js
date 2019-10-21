"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getTimestamp = void 0;
// This is .js for preval
var versionType = "PROD";
var versionNumber = Math.floor(1571630210446 / 1000);
var shortCommitSha = "218fa4e";

var getTimestamp = function getTimestamp(version) {
  return +version.split('-')[1];
};

exports.getTimestamp = getTimestamp;
var _default = "PROD-1571630210-218fa4e";
exports["default"] = _default;
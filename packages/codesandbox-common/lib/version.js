"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getTimestamp = void 0;
// This is .js for preval
var versionType = "PROD";
var versionNumber = Math.floor(1571304515714 / 1000);
var shortCommitSha = "3a2edb3";

var getTimestamp = function getTimestamp(version) {
  return +version.split('-')[1];
};

exports.getTimestamp = getTimestamp;
var _default = "PROD-1571304515-3a2edb3";
exports["default"] = _default;
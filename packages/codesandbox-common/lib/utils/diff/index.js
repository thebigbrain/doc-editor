"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findDiff = findDiff;
exports.getTextOperation = getTextOperation;

var _ot = require("ot");

var _lcs = require("./lcs");

var MAX_DIFF_SIZE = 10000;

function findDiff(originalText, modifiedText, pretty) {
  return (0, _lcs.stringDiff)(originalText, modifiedText, pretty);
}

function getTextOperation(originalText, modifiedText) {
  var ot = new _ot.TextOperation();

  if (Math.max(originalText.length, modifiedText.length) > MAX_DIFF_SIZE) {
    ot["delete"](originalText.length);
    ot.insert(modifiedText); // eslint-disable-next-line

    console.warn('Not optimizing edits, file is larger than ' + MAX_DIFF_SIZE + 'b');
    return ot;
  }

  var diffs = findDiff(originalText, modifiedText, false);
  var lastPos = 0;
  diffs.forEach(function (change) {
    var start = change.originalStart;
    var end = change.originalStart + change.originalLength;

    if (start - lastPos !== 0) {
      ot.retain(start - lastPos);
    }

    lastPos = end;
    var oldText = originalText.substr(start, change.originalLength);
    var newText = modifiedText.substr(change.modifiedStart, change.modifiedLength);

    if (oldText !== newText) {
      ot.insert(newText);
      ot["delete"](change.originalLength);
    }
  });
  ot.retain(originalText.length - ot.baseLength);
  return ot;
}
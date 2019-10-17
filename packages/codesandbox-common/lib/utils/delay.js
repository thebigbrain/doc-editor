"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = delay;

function delay() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
  return new Promise(function (resolve) {
    return setTimeout(resolve, timeout);
  });
}
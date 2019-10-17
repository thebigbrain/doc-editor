"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMac = exports.isSafari = exports.isIOS = void 0;
var isIOS = typeof navigator !== 'undefined' && Boolean(navigator.platform.match(/(iPhone|iPod|iPad)/i));
exports.isIOS = isIOS;
var isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
exports.isSafari = isSafari;
var isMac = typeof navigator !== 'undefined' && (isIOS || Boolean(navigator.platform.match(/Mac/i)));
exports.isMac = isMac;
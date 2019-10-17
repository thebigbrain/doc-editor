"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = detectOldBrowser;

function detectIE() {
  var ua = navigator.userAgent;
  var msie = ua.indexOf('MSIE ');

  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');

  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  } // other browser


  return false;
}

function detectOpera() {
  return navigator.userAgent.indexOf('Opera') > -1;
}

function detectOldBrowser() {
  return detectIE() || detectOpera();
}
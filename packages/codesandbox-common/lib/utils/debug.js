"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _global = require("./global");

var shouldShowDebugger = function shouldShowDebugger() {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    return true;
  }

  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  if (typeof document !== 'undefined' && document.location.search.includes('debug')) {
    return true;
  }

  return false;
};

var getDebugger = function getDebugger() {
  if (!shouldShowDebugger()) {
    var global = (0, _global.getGlobal)(); // Return a debugger that will log to sentry

    return function (key) {
      return function (message) {
        // Disable it for now, seems to affect performance. That's the last thing we want
        // from this (https://github.com/codesandbox/codesandbox-client/issues/1671)
        // TODO: move this to sentry
        if (false || (0, _typeof2["default"])(global.Raven) === 'object') {
          try {
            global.Raven.captureBreadcrumb({
              message: "".concat(key, " - ").concat(message),
              category: 'logging'
            });
          } catch (e) {
            console.error(e);
          }
        }
      };
    };
  } // @ts-ignore


  var debug = require('debug'); // eslint-disable-line global-require
  // debug.enable('cs:*');
  // debug.disable('cs:cp-*');


  return debug;
};

var _default = getDebugger();

exports["default"] = _default;
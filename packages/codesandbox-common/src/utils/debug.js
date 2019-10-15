"use strict";
exports.__esModule = true;
var global_1 = require("./global");
var shouldShowDebugger = function () {
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
        return true;
    }
    if (process.env.NODE_ENV === 'development') {
        return true;
    }
    if (typeof document !== 'undefined' &&
        document.location.search.includes('debug')) {
        return true;
    }
    return false;
};
var getDebugger = function () {
    if (!shouldShowDebugger()) {
        var global_2 = global_1.getGlobal();
        // Return a debugger that will log to sentry
        return function (key) { return function (message) {
            // Disable it for now, seems to affect performance. That's the last thing we want
            // from this (https://github.com/codesandbox/codesandbox-client/issues/1671)
            // TODO: move this to sentry
            if (false || typeof global_2.Raven === 'object') {
                try {
                    global_2.Raven.captureBreadcrumb({
                        message: key + " - " + message,
                        category: 'logging'
                    });
                }
                catch (e) {
                    console.error(e);
                }
            }
        }; };
    }
    // @ts-ignore
    var debug = require('debug'); // eslint-disable-line global-require
    // debug.enable('cs:*');
    // debug.disable('cs:cp-*');
    return debug;
};
exports["default"] = getDebugger();

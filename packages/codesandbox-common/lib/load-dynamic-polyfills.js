"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = requirePolyfills;

var _detectOldBrowser = _interopRequireDefault(require("./detect-old-browser"));

var _systemImportTransformerGlobalIdentifier = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};

function requirePolyfills() {
  var promises = [];

  if ((0, _detectOldBrowser["default"])() || typeof Object.entries === 'undefined') {
    promises.push(typeof _systemImportTransformerGlobalIdentifier.define === "function" && _systemImportTransformerGlobalIdentifier.define.amd ? new Promise(function (resolve, reject) {
      _systemImportTransformerGlobalIdentifier.require(["@babel/polyfill"], resolve, reject);
    }) : typeof module !== "undefined" && module.exports && typeof require !== "undefined" || typeof module !== "undefined" && module.component && _systemImportTransformerGlobalIdentifier.require && _systemImportTransformerGlobalIdentifier.require.loader === "component" ? Promise.resolve(require((
    /* webpackChunkName: 'polyfills' */
    '@babel/polyfill'))) : Promise.resolve(_systemImportTransformerGlobalIdentifier["@babel/polyfill"]));
  }

  if (typeof Error.captureStackTrace === 'undefined') {
    promises.push(typeof _systemImportTransformerGlobalIdentifier.define === "function" && _systemImportTransformerGlobalIdentifier.define.amd ? new Promise(function (resolve, reject) {
      _systemImportTransformerGlobalIdentifier.require(["error-polyfill"], resolve, reject);
    }) : typeof module !== "undefined" && module.exports && typeof require !== "undefined" || typeof module !== "undefined" && module.component && _systemImportTransformerGlobalIdentifier.require && _systemImportTransformerGlobalIdentifier.require.loader === "component" ? Promise.resolve(require((
    /* webpackChunkName: 'error-polyfill' */
    'error-polyfill'))) : Promise.resolve(_systemImportTransformerGlobalIdentifier["error-polyfill"]));
  }

  return Promise.all(promises);
}
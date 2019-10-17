"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var config = {
  title: 'sandbox.config.json',
  type: 'sandbox',
  description: 'Configuration specific to the current sandbox.',
  moreInfoUrl: 'https://codesandbox.io/docs/configuration#sandbox-configuration',
  getDefaultCode: function getDefaultCode() {
    return JSON.stringify({
      infiniteLoopProtection: true,
      hardReloadOnChange: false,
      view: 'browser'
    }, null, 2);
  }
};
var _default = config;
exports["default"] = _default;
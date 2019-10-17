"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var config = {
  title: 'now.json',
  type: 'now',
  description: 'Configuration for your deployments on now.',
  moreInfoUrl: 'https://zeit.co/docs/features/configuration',
  getDefaultCode: function getDefaultCode() {
    return JSON.stringify({}, null, 2);
  }
};
var _default = config;
exports["default"] = _default;
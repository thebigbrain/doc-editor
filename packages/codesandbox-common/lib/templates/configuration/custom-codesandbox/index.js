"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var config = {
  title: 'template.json',
  type: 'customTemplate',
  description: 'Configuration for the custom template',
  moreInfoUrl: 'https://codesandbox.io',
  getDefaultCode: function getDefaultCode() {
    return JSON.stringify({
      templateName: 'custom',
      templateColor: '#aaa',
      sandpack: {
        defaultExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
        aliases: {},
        transpilers: {
          '\\.jsx?$': ['codesandbox:babel'],
          '\\.json$': ['codesandbox:json']
        }
      }
    }, null, 2);
  }
};
var _default = config;
exports["default"] = _default;
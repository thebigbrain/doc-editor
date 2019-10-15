"use strict";
exports.__esModule = true;
var config = {
    title: 'template.json',
    type: 'customTemplate',
    description: 'Configuration for the custom template',
    moreInfoUrl: 'https://codesandbox.io',
    getDefaultCode: function () {
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
exports["default"] = config;

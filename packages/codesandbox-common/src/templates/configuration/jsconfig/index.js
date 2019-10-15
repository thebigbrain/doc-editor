"use strict";
exports.__esModule = true;
var config = {
    title: 'jsconfig.json',
    type: 'jsconfig',
    description: 'Configuration for how the editor (and sometimes the bundler) reads and parses JavaScript.',
    moreInfoUrl: 'https://code.visualstudio.com/docs/languages/jsconfig',
    getDefaultCode: function (template, resolveModule) { return JSON.stringify({ compilerOptions: { baseUrl: '.' } }, null, 2); },
    schema: 'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/jsconfig.json',
    partialSupportDisclaimer: "Only `compilerOptions.baseUrl` field is supported."
};
exports["default"] = config;

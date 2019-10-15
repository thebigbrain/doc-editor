"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var configuration_1 = require("./configuration");
var template_1 = require("./template");
var theme_1 = require("../theme");
var extendedSandboxConfig = __assign(__assign({}, configuration_1["default"].sandboxConfig), { getDefaultCode: function () {
        return JSON.stringify({
            container: {
                port: 3000
            }
        }, null, 2);
    } });
exports["default"] = new template_1["default"]('sapper', 'Sapper', 'https://sapper.svelte.technology/', 'github/codesandbox-app/sapper-template', theme_1.decorateSelector(function () { return '#159497'; }), {
    extraConfigurations: {
        '/sandbox.config.json': extendedSandboxConfig
    },
    isServer: true,
    netlify: false,
    mainFile: ['/src/routes/index.html'],
    showOnHomePage: true
});

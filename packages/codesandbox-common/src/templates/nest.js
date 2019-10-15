"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
var configuration_1 = require("./configuration");
exports["default"] = new template_1["default"]('nest', 'Nest', 'https://nestjs.com/', 'github/nestjs/typescript-starter', theme_1.decorateSelector(function () { return '#ed2945'; }), {
    extraConfigurations: {
        '/tsconfig.json': configuration_1["default"].tsconfig
    },
    isServer: true,
    mainFile: ['/src/main.ts'],
    showOnHomePage: true,
    netlify: false
});

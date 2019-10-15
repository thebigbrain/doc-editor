"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
var configuration_1 = require("./configuration");
exports["default"] = new template_1["default"]('styleguidist', 'Styleguidist', 'https://react-styleguidist.js.org/', 'github/styleguidist/example', theme_1.decorateSelector(function () { return '#25d8fc'; }), {
    extraConfigurations: {
        '/.babelrc': configuration_1["default"].babelrc
    },
    isServer: true,
    distDir: 'styleguide',
    mainFile: [],
    showOnHomePage: true
});

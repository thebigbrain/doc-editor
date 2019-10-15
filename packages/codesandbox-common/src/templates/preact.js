"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
var configuration_1 = require("./configuration");
exports["default"] = new template_1["default"]('preact-cli', 'Preact', 'https://github.com/developit/preact-cli', 'preact', theme_1.decorateSelector(function () { return '#AD78DC'; }), {
    showOnHomePage: true,
    extraConfigurations: {
        '/.babelrc': configuration_1["default"].babelrc
    }
});

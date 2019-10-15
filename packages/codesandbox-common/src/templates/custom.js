"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
var configuration_1 = require("./configuration");
exports["default"] = new template_1["default"]('custom', 'Custom', 'https://codesandbox.io', 'custom', theme_1.decorateSelector(function () { return '#F5DA55'; }), {
    extraConfigurations: {
        '/.codesandbox/template.json': configuration_1["default"].customCodeSandbox
    }
});

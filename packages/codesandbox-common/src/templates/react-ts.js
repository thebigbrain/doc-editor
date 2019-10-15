"use strict";
exports.__esModule = true;
var configuration_1 = require("./configuration");
var template_1 = require("./template");
var theme_1 = require("../theme");
exports["default"] = new template_1["default"]('create-react-app-typescript', 'React + TS', 'https://github.com/wmonk/create-react-app-typescript', 'react-ts', theme_1.decorateSelector(function () { return '#009fff'; }), {
    isTypescript: true,
    showOnHomePage: false,
    extraConfigurations: {
        '/tsconfig.json': configuration_1["default"].tsconfig
    }
});

"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
var configuration_1 = require("./configuration");
exports["default"] = new template_1["default"]('create-react-app', 'React', 'https://github.com/facebookincubator/create-react-app', 'new', theme_1.decorateSelector(function () { return '#61DAFB'; }), {
    showOnHomePage: true,
    popular: true,
    main: true,
    mainFile: ['/src/index.js', '/src/index.tsx', '/src/index.ts'],
    extraConfigurations: {
        '/jsconfig.json': configuration_1["default"].jsconfig,
        '/tsconfig.json': configuration_1["default"].tsconfig
    }
});

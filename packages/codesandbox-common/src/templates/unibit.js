"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
exports["default"] = new template_1["default"]('unibit', 'Unibit', 'https://www.stackbit.com', 'github/stackbithq/stackbit-theme-universal/tree/master/', theme_1.decorateSelector(function () { return '#3EB0FD'; }), {
    distDir: 'public',
    isServer: true,
    popular: true,
    mainFile: ['README.md'],
    showOnHomePage: true,
    main: false,
    showCube: false
});

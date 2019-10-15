"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
exports["default"] = new template_1["default"]('static', 'Static', 'https://developer.mozilla.org/en-US/docs/Learn/HTML', 'github/codesandbox-app/static-template', theme_1.decorateSelector(function () { return '#3AA855'; }), {
    showOnHomePage: true,
    distDir: './',
    main: false,
    mainFile: ['/index.html']
});

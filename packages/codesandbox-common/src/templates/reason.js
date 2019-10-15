"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
exports["default"] = new template_1["default"]('reason', 'Reason', 'https://reasonml.github.io/reason-react/en/', 'reason', theme_1.decorateSelector(function () { return '#CB5747'; }), {
    showOnHomePage: true,
    main: false,
    netlify: false,
    mainFile: ['/src/Main.re', 'App.re', 'Index.re']
});

"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
exports["default"] = new template_1["default"]('marko', 'Marko', 'https://markojs.com/', 'github/nm123github/marko-codesandbox', theme_1.decorateSelector(function () { return '#f5ac00'; }), {
    isServer: true,
    showOnHomePage: true,
    main: false,
    netlify: false
});

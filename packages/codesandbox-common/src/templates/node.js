"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
exports["default"] = new template_1["default"]('node', 'Node', 'https://codesandbox.io/docs/sse', 'node', theme_1.decorateSelector(function () { return '#66cc33'; }), {
    isServer: true,
    showOnHomePage: true,
    main: true,
    netlify: false,
    popular: true,
    mainFile: ['/pages/index.vue', '/pages/index.js', '/src/pages/index.js']
});

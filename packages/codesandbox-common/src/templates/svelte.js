"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
exports["default"] = new template_1["default"]('svelte', 'Svelte', 'https://svelte.dev', 'svelte', theme_1.decorateSelector(function () { return '#FF3E00'; }), {
    showOnHomePage: true,
    showCube: false,
    distDir: 'public',
    mainFile: ['/app.svelte']
});

"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
exports["default"] = new template_1["default"]('quasar-framework', 'Quasar', 'https://quasar-framework.org/', 'github/quasarframework/quasar-codesandbox', theme_1.decorateSelector(function () { return '#43A4F2'; }), {
    isServer: true,
    mainFile: ['/src/pages/Index.vue'],
    showOnHomePage: true,
    netlify: false
});

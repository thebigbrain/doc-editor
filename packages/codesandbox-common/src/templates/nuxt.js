"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
var configuration_1 = require("./configuration");
exports["default"] = new template_1["default"]('nuxt', 'Nuxt.js', 'https://nuxtjs.org/', 'github/nuxt/codesandbox-nuxt', theme_1.decorateSelector(function () { return '#3B8070'; }), {
    extraConfigurations: {
        '/.babelrc': configuration_1["default"].babelrc
    },
    distDir: 'dist',
    isServer: true,
    popular: true,
    mainFile: ['/pages/index.vue'],
    showOnHomePage: true,
    main: true,
    showCube: false
});

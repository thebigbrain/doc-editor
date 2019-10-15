"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
exports["default"] = new template_1["default"]('adonis', 'AdonisJs', 'https://adonisjs.com/', 'github/adonisjs/adonis-starter-codesandbox', theme_1.decorateSelector(function () { return '#fff'; }), {
    isServer: true,
    mainFile: ['/start/routes.js'],
    showOnHomePage: true,
    netlify: false
});

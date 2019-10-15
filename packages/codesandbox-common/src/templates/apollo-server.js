"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
exports["default"] = new template_1["default"]('apollo', 'Apollo', 'https://www.apollographql.com/docs/apollo-server/', 'apollo-server', theme_1.decorateSelector(function () { return '#c4198b'; }), {
    isServer: true,
    netlify: false,
    mainFile: ['/src/index.js'],
    showOnHomePage: true
});

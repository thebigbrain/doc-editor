"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
exports["default"] = new template_1["default"]('mdx-deck', 'MDX Deck', 'https://github.com/jxnblk/mdx-deck', 'github/jxnblk/mdx-deck/tree/master/templates/basic', theme_1.decorateSelector(function () { return '#FAD961'; }), {
    distDir: 'dist',
    isServer: true,
    mainFile: ['deck.mdx'],
    showOnHomePage: true
});

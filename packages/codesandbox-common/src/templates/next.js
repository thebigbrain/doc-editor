"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
var configuration_1 = require("./configuration");
exports["default"] = new template_1["default"]('next', 'Next.js', 'https://nextjs.org/', 'github/zeit/next.js/tree/master/examples/hello-world', theme_1.decorateSelector(function () { return '#ffffff'; }), {
    extraConfigurations: {
        '/.babelrc': configuration_1["default"].babelrc
    },
    isServer: true,
    distDir: 'out',
    netlify: false,
    mainFile: ['/pages/index.js'],
    backgroundColor: theme_1.decorateSelector(function () { return '#000000'; }),
    showOnHomePage: true,
    main: true,
    popular: true,
    showCube: false
});

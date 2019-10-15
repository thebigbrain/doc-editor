"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
var configuration_1 = require("./configuration");
exports["default"] = new template_1["default"]('babel-repl', 'Babel', 'https://github.com/@babel/core', 'babel', theme_1.decorateSelector(function () { return '#F5DA55'; }), {
    extraConfigurations: {
        '/.babelrc': configuration_1["default"].babelrc,
        '/babel-transpiler.json': configuration_1["default"].babelTranspiler
    }
});

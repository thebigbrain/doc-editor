"use strict";
exports.__esModule = true;
var package_json_1 = require("./package-json");
var prettierRC_1 = require("./prettierRC");
var sandbox_1 = require("./sandbox");
var babelrc_1 = require("./babelrc");
var now_1 = require("./now");
var netlify_1 = require("./netlify");
var angular_cli_1 = require("./angular-cli");
var angular_json_1 = require("./angular-json");
var tsconfig_1 = require("./tsconfig");
var jsconfig_1 = require("./jsconfig");
var babel_transpiler_1 = require("./babel-transpiler");
var custom_codesandbox_1 = require("./custom-codesandbox");
var configs = {
    babelrc: babelrc_1["default"],
    babelTranspiler: babel_transpiler_1["default"],
    packageJSON: package_json_1["default"],
    prettierRC: prettierRC_1["default"],
    sandboxConfig: sandbox_1["default"],
    angularCli: angular_cli_1["default"],
    angularJSON: angular_json_1["default"],
    tsconfig: tsconfig_1["default"],
    customCodeSandbox: custom_codesandbox_1["default"],
    nowConfig: now_1["default"],
    netlifyConfig: netlify_1["default"],
    jsconfig: jsconfig_1["default"]
};
exports["default"] = configs;

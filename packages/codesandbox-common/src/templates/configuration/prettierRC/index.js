"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var prettify_default_config_1 = require("../../../prettify-default-config");
var config = {
    title: '.prettierrc',
    type: 'prettier',
    description: 'Defines how all files will be prettified by Prettier.',
    moreInfoUrl: 'https://prettier.io/docs/en/configuration.html',
    generateFileFromState: function (prettierConfig) {
        return JSON.stringify(__assign(__assign({}, prettify_default_config_1["default"]), (prettierConfig || {})), null, 2);
    },
    schema: 'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/prettierrc.json'
};
exports["default"] = config;

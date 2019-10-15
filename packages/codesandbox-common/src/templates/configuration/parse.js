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
var markty_toml_1 = require("markty-toml");
var jsonlint_browser_1 = require("../../forked-vendors/jsonlint.browser");
function getCode(template, module, sandbox, resolveModule, configurationFile) {
    if (module) {
        return { code: module.code, generated: false };
    }
    if (configurationFile.getDefaultCode) {
        return {
            code: configurationFile.getDefaultCode(template, resolveModule),
            generated: true
        };
    }
    if (sandbox && configurationFile.generateFileFromSandbox) {
        return {
            code: configurationFile.generateFileFromSandbox(sandbox),
            generated: true
        };
    }
    return { code: '', generated: false };
}
function titleIncludes(module, test) {
    if ('title' in module) {
        return module.title.includes(test);
    }
    if ('path' in module) {
        return module.path.includes(test);
    }
    return false;
}
/**
 * We convert all configuration file configs to an object with configuration per
 * type. This makes configs universal.
 */
function parseConfigurations(template, configurationFiles, resolveModule, sandbox) {
    var configurations = {};
    var paths = Object.keys(configurationFiles);
    for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var module_1 = resolveModule(path);
        var configurationFile = configurationFiles[path];
        var baseObject = __assign({ path: path }, getCode(template, module_1, sandbox, resolveModule, configurationFile));
        var code = baseObject.code;
        if (code) {
            try {
                var parsed = void 0;
                // it goes here three times and the third time it doesn't have a title but a path
                // that took a while ffs
                // if toml do it with toml parser
                if (module_1 && titleIncludes(module_1, 'toml')) {
                    // never throws
                    parsed = markty_toml_1["default"](code);
                }
                else {
                    parsed = jsonlint_browser_1.parse(code);
                }
                configurations[configurationFile.type] = __assign(__assign({}, baseObject), { parsed: parsed });
            }
            catch (e) {
                configurations[configurationFile.type] = __assign(__assign({}, baseObject), { error: e });
            }
        }
    }
    return configurations;
}
exports["default"] = parseConfigurations;

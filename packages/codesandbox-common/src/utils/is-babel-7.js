"use strict";
exports.__esModule = true;
var semver_1 = require("semver");
function isCRAVersion2(dependencies, devDependencies) {
    var reactScriptsVersion = dependencies['react-scripts'] || devDependencies['react-scripts'];
    if (reactScriptsVersion) {
        return (/^[a-z]/.test(reactScriptsVersion) ||
            semver_1["default"].intersects(reactScriptsVersion, '^2.0.0') ||
            semver_1["default"].intersects(reactScriptsVersion, '^3.0.0'));
    }
    return false;
}
function isBabel7(dependencies, devDependencies) {
    if (dependencies === void 0) { dependencies = {}; }
    if (devDependencies === void 0) { devDependencies = {}; }
    if (devDependencies['@vue/cli-plugin-babel']) {
        return true;
    }
    if (devDependencies['@babel/core'] || dependencies['@babel/core']) {
        return true;
    }
    if (dependencies.svelte || devDependencies.svelte) {
        var ver = dependencies.svelte || devDependencies.svelte;
        var maj = ver.split('.')[0];
        if (maj) {
            return +maj > 2;
        }
        return false;
    }
    if ('typescript' in devDependencies && !dependencies['@angular/core']) {
        return true;
    }
    if (isCRAVersion2(dependencies, devDependencies)) {
        return true;
    }
    return false;
}
exports.isBabel7 = isBabel7;

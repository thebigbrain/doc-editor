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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var memoize_one_1 = require("memoize-one");
var color_1 = require("color");
var codesandbox_json_1 = require("./themes/codesandbox.json");
var colorMethods = [
    'negate',
    'lighten',
    'darken',
    'saturate',
    'desaturate',
    'greyscale',
    'whiten',
    'blacken',
    'clearer',
    'opaquer',
    'rotate',
];
/**
 * Takes a selector that returns a color string and returns new decorated selector that calls the
 * original function to get the color and then modifies that color, ultimately returning another
 * color string.
 *
 * vy60q8l043
 */
var addModifier = function (fn, method) {
    var modifierArgs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        modifierArgs[_i - 2] = arguments[_i];
    }
    return function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = color_1["default"](fn.apply(void 0, args)))[method].apply(_a, modifierArgs).rgbString();
    };
};
/**
 * Add useful methods directly to selector function, as well as put an rgbString() call at the end
 * @param selector
 */
exports.decorateSelector = function (selector) {
    // add member functions to our selector
    colorMethods.forEach(function (method) {
        selector[method] = memoize_one_1["default"](function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return exports.decorateSelector(addModifier.apply(void 0, __spreadArrays([selector, method], args)));
        });
    });
    return selector;
};
function createTheme(colors) {
    var transformed = Object.keys(colors)
        .map(function (c) { return ({ key: c, value: colors[c] }); })
        .map(function (_a) {
        var key = _a.key, value = _a.value;
        return ({ key: key, value: exports.decorateSelector(function () { return value; }) });
    })
        .reduce(function (prev, _a) {
        var _b;
        var key = _a.key, value = _a.value;
        return (__assign(__assign({}, prev), (_b = {}, _b[key] = value, _b)));
    }, {});
    return transformed;
}
var theme = __assign(__assign({}, createTheme({
    background: '#24282A',
    background2: '#1C2022',
    background3: '#374140',
    background4: '#141618',
    background5: '#111518',
    primary: '#FFD399',
    primaryText: '#7F694C',
    lightText: '#F2F2F2',
    secondary: '#40A9F3',
    shySecondary: '#66b9f4',
    darkBlue: '#1081D0',
    white: '#E0E0E0',
    gray: '#C0C0C0',
    black: '#74757D',
    green: '#5da700',
    redBackground: '#400000',
    red: '#F27777',
    dangerBackground: '#DC3545',
    sidebar: '#191d1f',
    placeholder: '#B8B9BA',
    link: '#40a9f3'
})), { vscodeTheme: codesandbox_json_1["default"], "new": createTheme({
        title: '#EEEEFF',
        description: '#777788',
        bg: '#2B2E41'
    }) });
exports["default"] = theme;

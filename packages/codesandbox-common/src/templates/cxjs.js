"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var template_1 = require("./template");
var theme_1 = require("../theme");
var configuration_1 = require("./configuration");
var CxJSTemplate = /** @class */ (function (_super) {
    __extends(CxJSTemplate, _super);
    function CxJSTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CxJSTemplate.prototype.getEntries = function () {
        return ['/app/index.js', '/src/index.js', '/index.html'];
    };
    CxJSTemplate.prototype.getHTMLEntries = function () {
        return ['/app/index.html', '/src/index.html', '/index.html'];
    };
    return CxJSTemplate;
}(template_1["default"]));
exports["default"] = new CxJSTemplate('cxjs', 'CxJS', 'https://cxjs.io/', 'github/codaxy/cxjs-codesandbox-template', theme_1.decorateSelector(function () { return '#11689f'; }), {
    showOnHomePage: true,
    showCube: false,
    extraConfigurations: {
        '/.babelrc': configuration_1["default"].babelrc,
        '/tsconfig.json': configuration_1["default"].tsconfig
    },
    externalResourcesEnabled: false,
    distDir: 'dist'
});

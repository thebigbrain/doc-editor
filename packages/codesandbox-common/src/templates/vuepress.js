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
var VuePressTemplate = /** @class */ (function (_super) {
    __extends(VuePressTemplate, _super);
    function VuePressTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // The file to open by the editor
    VuePressTemplate.prototype.getDefaultOpenedFiles = function () {
        return ['/README.md', '/guide/README.md'];
    };
    return VuePressTemplate;
}(template_1["default"]));
exports.VuePressTemplate = VuePressTemplate;
exports["default"] = new VuePressTemplate('vuepress', 'VuePress', 'https://vuepress.vuejs.org/', 'github/vicbergquist/codesandbox-vuepress', theme_1.decorateSelector(function () { return '#4abf8a'; }), {
    mainFile: [],
    distDir: '.vuepress/dist',
    isServer: true,
    showOnHomePage: true
});

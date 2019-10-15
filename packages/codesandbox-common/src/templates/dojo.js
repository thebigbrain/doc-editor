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
var DojoTemplate = /** @class */ (function (_super) {
    __extends(DojoTemplate, _super);
    function DojoTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // eslint-disable-next-line no-unused-vars
    DojoTemplate.prototype.getHTMLEntries = function (configurationFiles) {
        return ['/src/index.html'];
    };
    DojoTemplate.prototype.getEntries = function (configurationFiles) {
        var entries = _super.prototype.getEntries.call(this, configurationFiles);
        entries.push('/src/main.ts');
        return entries;
    };
    return DojoTemplate;
}(template_1["default"]));
exports.DojoTemplate = DojoTemplate;
exports["default"] = new DojoTemplate('@dojo/cli-create-app', 'Dojo', 'https://github.com/dojo/cli-create-app', 'github/dojo/dojo-codesandbox-template', theme_1.decorateSelector(function () { return '#D3471C'; }), {
    showOnHomePage: true,
    showCube: false,
    distDir: 'output/dist',
    isTypescript: true,
    extraConfigurations: {
        '/tsconfig.json': configuration_1["default"].tsconfig
    }
});

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
var path_1 = require("../utils/path");
var template_1 = require("./template");
var theme_1 = require("../theme");
var configuration_1 = require("./configuration");
var ParcelTemplate = /** @class */ (function (_super) {
    __extends(ParcelTemplate, _super);
    function ParcelTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParcelTemplate.prototype.getEntries = function (configurationFiles) {
        var entries = [];
        if (typeof document !== 'undefined' && document.location.pathname !== '/') {
            // Push the location of the address bar, eg. when someone has a file
            // /2.html open, you actually want to have that as entry point instead
            // of index.html.
            entries.push(document.location.pathname);
        }
        entries.push(configurationFiles.package &&
            configurationFiles.package.parsed &&
            configurationFiles.package.parsed.main &&
            path_1.absolute(configurationFiles.package.parsed.main));
        entries.push('/index.html');
        entries.push('/src/index.html');
        return entries.filter(Boolean);
    };
    /**
     * The file to open by the editor
     */
    ParcelTemplate.prototype.getDefaultOpenedFiles = function (configFiles) {
        var entries = [];
        entries.push('/index.js');
        entries.push('/src/index.js');
        entries.concat(this.getEntries(configFiles));
        return entries;
    };
    return ParcelTemplate;
}(template_1["default"]));
exports.ParcelTemplate = ParcelTemplate;
exports["default"] = new ParcelTemplate('parcel', 'Vanilla', 'https://parceljs.org/', 'vanilla', theme_1.decorateSelector(function () { return '#dfb07a'; }), {
    showOnHomePage: true,
    showCube: true,
    extraConfigurations: {
        '/.babelrc': configuration_1["default"].babelrc,
        '/tsconfig.json': configuration_1["default"].tsconfig
    },
    externalResourcesEnabled: false,
    distDir: 'dist',
    main: true,
    isTypescript: true,
    popular: true
});

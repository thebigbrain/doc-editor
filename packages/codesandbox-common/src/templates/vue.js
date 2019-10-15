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
var VueTemplate = /** @class */ (function (_super) {
    __extends(VueTemplate, _super);
    function VueTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VueTemplate.prototype.getEntries = function (configurationFiles) {
        var entries = _super.prototype.getEntries.call(this, configurationFiles);
        entries.push('/src/main.js');
        entries.push('/main.js');
        return entries;
    };
    // eslint-disable-next-line no-unused-vars
    VueTemplate.prototype.getHTMLEntries = function (configurationFiles) {
        return ['/static/index.html', '/index.html'];
    };
    return VueTemplate;
}(template_1["default"]));
exports["default"] = new VueTemplate('vue-cli', 'Vue', 'https://github.com/vuejs/vue-cli', 'vue', theme_1.decorateSelector(function () { return '#41B883'; }), {
    showOnHomePage: true,
    extraConfigurations: {
        '/.babelrc': configuration_1["default"].babelrc
    },
    distDir: 'dist',
    main: true,
    popular: true,
    mainFile: ['/src/main.js', '/src/main.ts']
});

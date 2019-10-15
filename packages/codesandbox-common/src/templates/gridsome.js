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
var GridsomeTemplate = /** @class */ (function (_super) {
    __extends(GridsomeTemplate, _super);
    function GridsomeTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridsomeTemplate.prototype.getViews = function () {
        var GRIDSOME_VIEWS = [
            {
                views: [
                    { id: 'codesandbox.browser' },
                    {
                        id: 'codesandbox.browser',
                        closeable: true,
                        options: {
                            url: '/___explore',
                            title: 'GraphiQL'
                        }
                    },
                ]
            },
            {
                open: true,
                views: [
                    { id: 'codesandbox.terminal' },
                    { id: 'codesandbox.console' },
                    { id: 'codesandbox.problems' },
                ]
            },
        ];
        return GRIDSOME_VIEWS;
    };
    return GridsomeTemplate;
}(template_1["default"]));
exports["default"] = new GridsomeTemplate('gridsome', 'Gridsome', 'https://gridsome.org/', 'github/SaraVieira/gridsome-starter-codesandbox', theme_1.decorateSelector(function () { return '#00a672'; }), {
    distDir: 'dist',
    isServer: true,
    mainFile: ['/src/pages/Index.vue'],
    showOnHomePage: true,
    main: true
});

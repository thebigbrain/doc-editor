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
var GatsbyTemplate = /** @class */ (function (_super) {
    __extends(GatsbyTemplate, _super);
    function GatsbyTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GatsbyTemplate.prototype.getViews = function () {
        var GATSBY_VIEWS = [
            {
                views: [
                    { id: 'codesandbox.browser' },
                    {
                        id: 'codesandbox.browser',
                        closeable: true,
                        options: {
                            url: '/___graphql',
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
        return GATSBY_VIEWS;
    };
    return GatsbyTemplate;
}(template_1["default"]));
exports["default"] = new GatsbyTemplate('gatsby', 'Gatsby', 'https://www.gatsbyjs.org/', 'github/gatsbyjs/gatsby-starter-default', theme_1.decorateSelector(function () { return '#8C65B3'; }), {
    extraConfigurations: {
        '/.babelrc': configuration_1["default"].babelrc
    },
    distDir: 'public',
    isServer: true,
    mainFile: ['/src/pages/index.js'],
    showOnHomePage: true,
    main: true,
    popular: true,
    showCube: false
});

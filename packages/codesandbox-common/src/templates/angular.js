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
var configuration_1 = require("./configuration");
var theme_1 = require("../theme");
function getAngularCLIEntries(parsed) {
    var entries = [];
    if (parsed) {
        var app = parsed.apps && parsed.apps[0];
        if (app && app.root && app.main) {
            entries.push(path_1.absolute(path_1.join(app.root, app.main)));
        }
    }
    return entries;
}
function getAngularJSONEntries(parsed) {
    var entries = [];
    if (parsed) {
        var defaultProject = parsed.defaultProject;
        var project = parsed.projects[defaultProject];
        var build = project.architect.build;
        if (build.options.main) {
            entries.push(path_1.absolute(path_1.join(project.root, build.options.main)));
        }
    }
    return entries;
}
function getAngularCLIHTMLEntry(parsed) {
    if (parsed) {
        var app = parsed.apps && parsed.apps[0];
        if (app && app.root && app.index) {
            return [path_1.absolute(path_1.join(app.root, app.index))];
        }
    }
    return [];
}
function getAngularJSONHTMLEntry(parsed) {
    if (parsed) {
        var defaultProject = parsed.defaultProject;
        var project = parsed.projects[defaultProject];
        var build = project.architect.build;
        if (build && project.root != null && build.options && build.options.index) {
            return [path_1.absolute(path_1.join(project.root, build.options.index))];
        }
    }
    return [];
}
var AngularTemplate = /** @class */ (function (_super) {
    __extends(AngularTemplate, _super);
    function AngularTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Override entry file because of angular-cli
     */
    AngularTemplate.prototype.getEntries = function (configurationFiles) {
        var entries = [];
        if (!configurationFiles['angular-config'].generated) {
            var parsed = configurationFiles['angular-config'].parsed;
            entries = entries.concat(getAngularJSONEntries(parsed));
        }
        else {
            var parsed = configurationFiles['angular-cli'].parsed;
            entries = entries.concat(getAngularCLIEntries(parsed));
        }
        if (configurationFiles.package.parsed &&
            configurationFiles.package.parsed.main) {
            entries.push(path_1.absolute(configurationFiles.package.parsed.main));
        }
        entries.push('/src/main.ts');
        entries.push('/main.ts');
        return entries;
    };
    AngularTemplate.prototype.getHTMLEntries = function (configurationFiles) {
        var entries = [];
        if (!configurationFiles['angular-config'].generated) {
            var parsed = configurationFiles['angular-config'].parsed;
            entries = entries.concat(getAngularJSONHTMLEntry(parsed));
        }
        else if (configurationFiles['angular-cli']) {
            var parsed = configurationFiles['angular-cli'].parsed;
            entries = entries.concat(getAngularCLIHTMLEntry(parsed));
        }
        entries.push('/public/index.html');
        entries.push('/index.html');
        return entries;
    };
    return AngularTemplate;
}(template_1["default"]));
exports["default"] = new AngularTemplate('angular-cli', 'Angular', 'https://github.com/angular/angular', 'angular', theme_1.decorateSelector(function () { return '#DD0031'; }), {
    extraConfigurations: {
        '/.angular-cli.json': configuration_1["default"].angularCli,
        '/angular.json': configuration_1["default"].angularJSON
    },
    netlify: false,
    isTypescript: true,
    distDir: 'dist',
    showOnHomePage: true,
    popular: true,
    main: true
});

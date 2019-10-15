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
var path_1 = require("../utils/path");
var configuration_1 = require("./configuration");
var defaultConfigurations = {
    '/package.json': configuration_1["default"].packageJSON,
    '/.prettierrc': configuration_1["default"].prettierRC,
    '/sandbox.config.json': configuration_1["default"].sandboxConfig,
    '/now.json': configuration_1["default"].nowConfig,
    '/netlify.toml': configuration_1["default"].netlifyConfig
};
var CLIENT_VIEWS = [
    {
        views: [{ id: 'codesandbox.browser' }, { id: 'codesandbox.tests' }]
    },
    {
        views: [{ id: 'codesandbox.console' }, { id: 'codesandbox.problems' }]
    },
];
// React sandboxes have an additional devtool on top of CLIENT_VIEWS
var REACT_CLIENT_VIEWS = __spreadArrays(CLIENT_VIEWS);
REACT_CLIENT_VIEWS[1].views.push({ id: 'codesandbox.react-devtools' });
var SERVER_VIEWS = [
    {
        views: [{ id: 'codesandbox.browser' }]
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
var Template = /** @class */ (function () {
    function Template(name, niceName, url, shortid, color, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        /**
         * Alter the apiData to ZEIT for making deployment work
         */
        this.alterDeploymentData = function (apiData) {
            var packageJSONFile = apiData.files.find(function (x) { return x.file === 'package.json'; });
            var parsedFile = JSON.parse(packageJSONFile.data);
            var newParsedFile = __assign(__assign({}, parsedFile), { devDependencies: __assign(__assign({}, parsedFile.devDependencies), { serve: '^10.1.1' }), scripts: __assign({ 'now-start': "cd " + _this.distDir + " && serve -s ./" }, parsedFile.scripts) });
            return __assign(__assign({}, apiData), { files: __spreadArrays(apiData.files.filter(function (x) { return x.file !== 'package.json'; }), [
                    {
                        file: 'package.json',
                        data: JSON.stringify(newParsedFile, null, 2)
                    },
                ]) });
        };
        this.name = name;
        this.niceName = niceName;
        this.url = url;
        this.shortid = shortid;
        this.color = color;
        this.popular = options.popular || false;
        this.isServer = options.isServer || false;
        this.main = options.main || false;
        this.showOnHomePage = options.showOnHomePage || false;
        this.distDir = options.distDir || 'build';
        this.configurationFiles = __assign(__assign({}, defaultConfigurations), (options.extraConfigurations || {}));
        this.isTypescript = options.isTypescript || false;
        this.externalResourcesEnabled =
            options.externalResourcesEnabled != null
                ? options.externalResourcesEnabled
                : true;
        this.mainFile = options.mainFile;
        this.netlify = options.netlify;
        this.backgroundColor = options.backgroundColor;
        this.showCube = options.showCube != null ? options.showCube : true;
    }
    // eslint-disable-next-line
    Template.prototype.getMainFromPackage = function (pkg) {
        try {
            if (!pkg.main) {
                return undefined;
            }
            if (Array.isArray(pkg.main)) {
                return path_1.absolute(pkg.main[0]);
            }
            if (typeof pkg.main === 'string') {
                return path_1.absolute(pkg.main);
            }
        }
        catch (e) {
            // eslint-disable-next-line
            console.log(e);
        }
    };
    /**
     * Get possible entry files to evaluate, differs per template
     */
    Template.prototype.getEntries = function (configurationFiles) {
        return __spreadArrays([
            configurationFiles.package &&
                this.getMainFromPackage(configurationFiles.package.parsed)
        ], (this.mainFile || []), [
            '/index.' + (this.isTypescript ? 'ts' : 'js'),
            '/src/index.' + (this.isTypescript ? 'ts' : 'js'),
            '/src/index.ts',
            '/src/index.tsx',
            '/src/index.js',
            '/src/pages/index.js',
            '/src/pages/index.vue',
            '/index.js',
            '/index.ts',
            '/index.tsx',
            '/README.md',
            '/package.json',
        ]).filter(function (x) { return x; });
    };
    /**
     * Files to be opened by default by the editor when opening the editor
     */
    Template.prototype.getDefaultOpenedFiles = function (configurationFiles) {
        return this.getEntries(configurationFiles);
    };
    /**
     * Get the views that are tied to the template
     */
    Template.prototype.getViews = function (configurationFiles) {
        if (this.isServer) {
            return SERVER_VIEWS;
        }
        var dependencies = configurationFiles.package &&
            configurationFiles.package.parsed &&
            configurationFiles.package.parsed.dependencies;
        if (dependencies && dependencies.react) {
            return REACT_CLIENT_VIEWS;
        }
        return CLIENT_VIEWS;
    };
    // eslint-disable-next-line no-unused-vars
    Template.prototype.getHTMLEntries = function (configurationFiles) {
        return ['/public/index.html', '/index.html'];
    };
    return Template;
}());
exports["default"] = Template;

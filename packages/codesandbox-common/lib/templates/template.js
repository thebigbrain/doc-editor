"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _path = require("../utils/path");

var _configuration = _interopRequireDefault(require("./configuration"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultConfigurations = {
  '/package.json': _configuration["default"].packageJSON,
  '/.prettierrc': _configuration["default"].prettierRC,
  '/sandbox.config.json': _configuration["default"].sandboxConfig,
  '/now.json': _configuration["default"].nowConfig,
  '/netlify.toml': _configuration["default"].netlifyConfig
};
var CLIENT_VIEWS = [{
  views: [{
    id: 'codesandbox.browser'
  }, {
    id: 'codesandbox.tests'
  }]
}, {
  views: [{
    id: 'codesandbox.console'
  }, {
    id: 'codesandbox.problems'
  }]
}]; // React sandboxes have an additional devtool on top of CLIENT_VIEWS

var REACT_CLIENT_VIEWS = [].concat(CLIENT_VIEWS);
REACT_CLIENT_VIEWS[1].views.push({
  id: 'codesandbox.react-devtools'
});
var SERVER_VIEWS = [{
  views: [{
    id: 'codesandbox.browser'
  }]
}, {
  open: true,
  views: [{
    id: 'codesandbox.terminal'
  }, {
    id: 'codesandbox.console'
  }, {
    id: 'codesandbox.problems'
  }]
}];

var Template =
/*#__PURE__*/
function () {
  function Template(name, niceName, url, shortid, color) {
    var _this = this;

    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    (0, _classCallCheck2["default"])(this, Template);

    /**
     * Alter the apiData to ZEIT for making deployment work
     */
    this.alterDeploymentData = function (apiData) {
      var packageJSONFile = apiData.files.find(function (x) {
        return x.file === 'package.json';
      });
      var parsedFile = JSON.parse(packageJSONFile.data);

      var newParsedFile = _objectSpread({}, parsedFile, {
        devDependencies: _objectSpread({}, parsedFile.devDependencies, {
          serve: '^10.1.1'
        }),
        scripts: _objectSpread({
          'now-start': "cd ".concat(_this.distDir, " && serve -s ./")
        }, parsedFile.scripts)
      });

      return _objectSpread({}, apiData, {
        files: [].concat((0, _toConsumableArray2["default"])(apiData.files.filter(function (x) {
          return x.file !== 'package.json';
        })), [{
          file: 'package.json',
          data: JSON.stringify(newParsedFile, null, 2)
        }])
      });
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
    this.configurationFiles = _objectSpread({}, defaultConfigurations, {}, options.extraConfigurations || {});
    this.isTypescript = options.isTypescript || false;
    this.externalResourcesEnabled = options.externalResourcesEnabled != null ? options.externalResourcesEnabled : true;
    this.mainFile = options.mainFile;
    this.netlify = options.netlify;
    this.backgroundColor = options.backgroundColor;
    this.showCube = options.showCube != null ? options.showCube : true;
  } // eslint-disable-next-line


  (0, _createClass2["default"])(Template, [{
    key: "getMainFromPackage",
    value: function getMainFromPackage(pkg) {
      try {
        if (!pkg.main) {
          return undefined;
        }

        if (Array.isArray(pkg.main)) {
          return (0, _path.absolute)(pkg.main[0]);
        }

        if (typeof pkg.main === 'string') {
          return (0, _path.absolute)(pkg.main);
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    }
    /**
     * Get possible entry files to evaluate, differs per template
     */

  }, {
    key: "getEntries",
    value: function getEntries(configurationFiles) {
      return [configurationFiles["package"] && this.getMainFromPackage(configurationFiles["package"].parsed)].concat((0, _toConsumableArray2["default"])(this.mainFile || []), ['/index.' + (this.isTypescript ? 'ts' : 'js'), '/src/index.' + (this.isTypescript ? 'ts' : 'js'), '/src/index.ts', '/src/index.tsx', '/src/index.js', '/src/pages/index.js', '/src/pages/index.vue', '/index.js', '/index.ts', '/index.tsx', '/README.md', '/package.json']).filter(function (x) {
        return x;
      });
    }
    /**
     * Files to be opened by default by the editor when opening the editor
     */

  }, {
    key: "getDefaultOpenedFiles",
    value: function getDefaultOpenedFiles(configurationFiles) {
      return this.getEntries(configurationFiles);
    }
    /**
     * Get the views that are tied to the template
     */

  }, {
    key: "getViews",
    value: function getViews(configurationFiles) {
      if (this.isServer) {
        return SERVER_VIEWS;
      }

      var dependencies = configurationFiles["package"] && configurationFiles["package"].parsed && configurationFiles["package"].parsed.dependencies;

      if (dependencies && dependencies.react) {
        return REACT_CLIENT_VIEWS;
      }

      return CLIENT_VIEWS;
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "getHTMLEntries",
    value: function getHTMLEntries(configurationFiles) {
      return ['/public/index.html', '/index.html'];
    }
  }]);
  return Template;
}();

exports["default"] = Template;
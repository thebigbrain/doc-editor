"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _path = require("../utils/path");

var _template = _interopRequireDefault(require("./template"));

var _configuration = _interopRequireDefault(require("./configuration"));

var _theme = require("../theme");

function getAngularCLIEntries(parsed) {
  var entries = [];

  if (parsed) {
    var app = parsed.apps && parsed.apps[0];

    if (app && app.root && app.main) {
      entries.push((0, _path.absolute)((0, _path.join)(app.root, app.main)));
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
      entries.push((0, _path.absolute)((0, _path.join)(project.root, build.options.main)));
    }
  }

  return entries;
}

function getAngularCLIHTMLEntry(parsed) {
  if (parsed) {
    var app = parsed.apps && parsed.apps[0];

    if (app && app.root && app.index) {
      return [(0, _path.absolute)((0, _path.join)(app.root, app.index))];
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
      return [(0, _path.absolute)((0, _path.join)(project.root, build.options.index))];
    }
  }

  return [];
}

var AngularTemplate =
/*#__PURE__*/
function (_Template) {
  (0, _inherits2["default"])(AngularTemplate, _Template);

  function AngularTemplate() {
    (0, _classCallCheck2["default"])(this, AngularTemplate);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AngularTemplate).apply(this, arguments));
  }

  (0, _createClass2["default"])(AngularTemplate, [{
    key: "getEntries",

    /**
     * Override entry file because of angular-cli
     */
    value: function getEntries(configurationFiles) {
      var entries = [];

      if (!configurationFiles['angular-config'].generated) {
        var parsed = configurationFiles['angular-config'].parsed;
        entries = entries.concat(getAngularJSONEntries(parsed));
      } else {
        var _parsed = configurationFiles['angular-cli'].parsed;
        entries = entries.concat(getAngularCLIEntries(_parsed));
      }

      if (configurationFiles["package"].parsed && configurationFiles["package"].parsed.main) {
        entries.push((0, _path.absolute)(configurationFiles["package"].parsed.main));
      }

      entries.push('/src/main.ts');
      entries.push('/main.ts');
      return entries;
    }
  }, {
    key: "getHTMLEntries",
    value: function getHTMLEntries(configurationFiles) {
      var entries = [];

      if (!configurationFiles['angular-config'].generated) {
        var parsed = configurationFiles['angular-config'].parsed;
        entries = entries.concat(getAngularJSONHTMLEntry(parsed));
      } else if (configurationFiles['angular-cli']) {
        var _parsed2 = configurationFiles['angular-cli'].parsed;
        entries = entries.concat(getAngularCLIHTMLEntry(_parsed2));
      }

      entries.push('/public/index.html');
      entries.push('/index.html');
      return entries;
    }
  }]);
  return AngularTemplate;
}(_template["default"]);

var _default = new AngularTemplate('angular-cli', 'Angular', 'https://github.com/angular/angular', 'angular', (0, _theme.decorateSelector)(function () {
  return '#DD0031';
}), {
  extraConfigurations: {
    '/.angular-cli.json': _configuration["default"].angularCli,
    '/angular.json': _configuration["default"].angularJSON
  },
  netlify: false,
  isTypescript: true,
  distDir: 'dist',
  showOnHomePage: true,
  popular: true,
  main: true
});

exports["default"] = _default;
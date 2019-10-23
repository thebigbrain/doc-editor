"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ParcelTemplate = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _path = require("../utils/path");

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _configuration = _interopRequireDefault(require("./configuration"));

var ParcelTemplate =
/*#__PURE__*/
function (_Template) {
  (0, _inherits2["default"])(ParcelTemplate, _Template);

  function ParcelTemplate() {
    (0, _classCallCheck2["default"])(this, ParcelTemplate);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ParcelTemplate).apply(this, arguments));
  }

  (0, _createClass2["default"])(ParcelTemplate, [{
    key: "getEntries",
    value: function getEntries(configurationFiles) {
      var entries = [];

      if (typeof document !== 'undefined' && document.location.pathname !== '/') {
        // Push the location of the address bar, eg. when someone has a file
        // /2.html open, you actually want to have that as entry point instead
        // of index.html.
        entries.push(document.location.pathname);
      }

      entries.push(configurationFiles["package"] && configurationFiles["package"].parsed && configurationFiles["package"].parsed.main && (0, _path.absolute)(configurationFiles["package"].parsed.main));
      entries.push('/index.html');
      entries.push('/src/index.html');
      return entries.filter(Boolean);
    }
    /**
     * The file to open by the editor
     */

  }, {
    key: "getDefaultOpenedFiles",
    value: function getDefaultOpenedFiles(configFiles) {
      var entries = [];
      entries.push('/index.js');
      entries.push('/src/index.js');
      entries.concat(this.getEntries(configFiles));
      return entries;
    }
  }]);
  return ParcelTemplate;
}(_template["default"]);

exports.ParcelTemplate = ParcelTemplate;

var _default = new ParcelTemplate('parcel', 'Vanilla', 'https://parceljs.org/', 'vanilla', (0, _theme.decorateSelector)(function () {
  return '#dfb07a';
}), {
  showOnHomePage: true,
  showCube: true,
  extraConfigurations: {
    '/.babelrc': _configuration["default"].babelrc,
    '/tsconfig.json': _configuration["default"].tsconfig
  },
  externalResourcesEnabled: false,
  distDir: 'dist',
  main: true,
  isTypescript: true,
  popular: true
});

exports["default"] = _default;
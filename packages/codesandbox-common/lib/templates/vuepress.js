"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.VuePressTemplate = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var VuePressTemplate =
/*#__PURE__*/
function (_Template) {
  (0, _inherits2["default"])(VuePressTemplate, _Template);

  function VuePressTemplate() {
    (0, _classCallCheck2["default"])(this, VuePressTemplate);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(VuePressTemplate).apply(this, arguments));
  }

  (0, _createClass2["default"])(VuePressTemplate, [{
    key: "getDefaultOpenedFiles",
    // The file to open by the editor
    value: function getDefaultOpenedFiles() {
      return ['/README.md', '/guide/README.md'];
    }
  }]);
  return VuePressTemplate;
}(_template["default"]);

exports.VuePressTemplate = VuePressTemplate;

var _default = new VuePressTemplate('vuepress', 'VuePress', 'https://vuepress.vuejs.org/', 'github/vicbergquist/codesandbox-vuepress', (0, _theme.decorateSelector)(function () {
  return '#4abf8a';
}), {
  mainFile: [],
  distDir: '.vuepress/dist',
  isServer: true,
  showOnHomePage: true
});

exports["default"] = _default;
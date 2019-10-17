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

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _configuration = _interopRequireDefault(require("./configuration"));

var CxJSTemplate =
/*#__PURE__*/
function (_Template) {
  (0, _inherits2["default"])(CxJSTemplate, _Template);

  function CxJSTemplate() {
    (0, _classCallCheck2["default"])(this, CxJSTemplate);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(CxJSTemplate).apply(this, arguments));
  }

  (0, _createClass2["default"])(CxJSTemplate, [{
    key: "getEntries",
    value: function getEntries() {
      return ['/app/index.js', '/src/index.js', '/index.html'];
    }
  }, {
    key: "getHTMLEntries",
    value: function getHTMLEntries() {
      return ['/app/index.html', '/src/index.html', '/index.html'];
    }
  }]);
  return CxJSTemplate;
}(_template["default"]);

var _default = new CxJSTemplate('cxjs', 'CxJS', 'https://cxjs.io/', 'github/codaxy/cxjs-codesandbox-template', (0, _theme.decorateSelector)(function () {
  return '#11689f';
}), {
  showOnHomePage: true,
  showCube: false,
  extraConfigurations: {
    '/.babelrc': _configuration["default"].babelrc,
    '/tsconfig.json': _configuration["default"].tsconfig
  },
  externalResourcesEnabled: false,
  distDir: 'dist'
});

exports["default"] = _default;
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

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _configuration = _interopRequireDefault(require("./configuration"));

var VueTemplate =
/*#__PURE__*/
function (_Template) {
  (0, _inherits2["default"])(VueTemplate, _Template);

  function VueTemplate() {
    (0, _classCallCheck2["default"])(this, VueTemplate);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(VueTemplate).apply(this, arguments));
  }

  (0, _createClass2["default"])(VueTemplate, [{
    key: "getEntries",
    value: function getEntries(configurationFiles) {
      var entries = (0, _get2["default"])((0, _getPrototypeOf2["default"])(VueTemplate.prototype), "getEntries", this).call(this, configurationFiles);
      entries.push('/src/main.js');
      entries.push('/main.js');
      return entries;
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "getHTMLEntries",
    value: function getHTMLEntries(configurationFiles) {
      return ['/static/index.html', '/index.html'];
    }
  }]);
  return VueTemplate;
}(_template["default"]);

var _default = new VueTemplate('vue-cli', 'Vue', 'https://github.com/vuejs/vue-cli', 'vue', (0, _theme.decorateSelector)(function () {
  return '#41B883';
}), {
  showOnHomePage: true,
  extraConfigurations: {
    '/.babelrc': _configuration["default"].babelrc
  },
  distDir: 'dist',
  main: true,
  popular: true,
  mainFile: ['/src/main.js', '/src/main.ts']
});

exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DojoTemplate = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _configuration = _interopRequireDefault(require("./configuration"));

var DojoTemplate =
/*#__PURE__*/
function (_Template) {
  (0, _inherits2["default"])(DojoTemplate, _Template);

  function DojoTemplate() {
    (0, _classCallCheck2["default"])(this, DojoTemplate);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DojoTemplate).apply(this, arguments));
  }

  (0, _createClass2["default"])(DojoTemplate, [{
    key: "getHTMLEntries",
    // eslint-disable-next-line no-unused-vars
    value: function getHTMLEntries(configurationFiles) {
      return ['/src/index.html'];
    }
  }, {
    key: "getEntries",
    value: function getEntries(configurationFiles) {
      var entries = (0, _get2["default"])((0, _getPrototypeOf2["default"])(DojoTemplate.prototype), "getEntries", this).call(this, configurationFiles);
      entries.push('/src/main.ts');
      return entries;
    }
  }]);
  return DojoTemplate;
}(_template["default"]);

exports.DojoTemplate = DojoTemplate;

var _default = new DojoTemplate('@dojo/cli-create-app', 'Dojo', 'https://github.com/dojo/cli-create-app', 'github/dojo/dojo-codesandbox-template', (0, _theme.decorateSelector)(function () {
  return '#D3471C';
}), {
  showOnHomePage: true,
  showCube: false,
  distDir: 'output/dist',
  isTypescript: true,
  extraConfigurations: {
    '/tsconfig.json': _configuration["default"].tsconfig
  }
});

exports["default"] = _default;
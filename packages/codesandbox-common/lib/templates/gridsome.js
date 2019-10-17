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

var GridsomeTemplate =
/*#__PURE__*/
function (_Template) {
  (0, _inherits2["default"])(GridsomeTemplate, _Template);

  function GridsomeTemplate() {
    (0, _classCallCheck2["default"])(this, GridsomeTemplate);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(GridsomeTemplate).apply(this, arguments));
  }

  (0, _createClass2["default"])(GridsomeTemplate, [{
    key: "getViews",
    value: function getViews() {
      var GRIDSOME_VIEWS = [{
        views: [{
          id: 'codesandbox.browser'
        }, {
          id: 'codesandbox.browser',
          closeable: true,
          options: {
            url: '/___explore',
            title: 'GraphiQL'
          }
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
      return GRIDSOME_VIEWS;
    }
  }]);
  return GridsomeTemplate;
}(_template["default"]);

var _default = new GridsomeTemplate('gridsome', 'Gridsome', 'https://gridsome.org/', 'github/SaraVieira/gridsome-starter-codesandbox', (0, _theme.decorateSelector)(function () {
  return '#00a672';
}), {
  distDir: 'dist',
  isServer: true,
  mainFile: ['/src/pages/Index.vue'],
  showOnHomePage: true,
  main: true
});

exports["default"] = _default;
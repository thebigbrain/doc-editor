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

var GatsbyTemplate =
/*#__PURE__*/
function (_Template) {
  (0, _inherits2["default"])(GatsbyTemplate, _Template);

  function GatsbyTemplate() {
    (0, _classCallCheck2["default"])(this, GatsbyTemplate);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(GatsbyTemplate).apply(this, arguments));
  }

  (0, _createClass2["default"])(GatsbyTemplate, [{
    key: "getViews",
    value: function getViews() {
      var GATSBY_VIEWS = [{
        views: [{
          id: 'codesandbox.browser'
        }, {
          id: 'codesandbox.browser',
          closeable: true,
          options: {
            url: '/___graphql',
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
      return GATSBY_VIEWS;
    }
  }]);
  return GatsbyTemplate;
}(_template["default"]);

var _default = new GatsbyTemplate('gatsby', 'Gatsby', 'https://www.gatsbyjs.org/', 'github/gatsbyjs/gatsby-starter-default', (0, _theme.decorateSelector)(function () {
  return '#8C65B3';
}), {
  extraConfigurations: {
    '/.babelrc': _configuration["default"].babelrc
  },
  distDir: 'public',
  isServer: true,
  mainFile: ['/src/pages/index.js'],
  showOnHomePage: true,
  main: true,
  popular: true,
  showCube: false
});

exports["default"] = _default;
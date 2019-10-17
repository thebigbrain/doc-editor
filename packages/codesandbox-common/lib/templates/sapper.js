"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _configuration = _interopRequireDefault(require("./configuration"));

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var extendedSandboxConfig = _objectSpread({}, _configuration["default"].sandboxConfig, {
  getDefaultCode: function getDefaultCode() {
    return JSON.stringify({
      container: {
        port: 3000
      }
    }, null, 2);
  }
});

var _default = new _template["default"]('sapper', 'Sapper', 'https://sapper.svelte.technology/', 'github/codesandbox-app/sapper-template', (0, _theme.decorateSelector)(function () {
  return '#159497';
}), {
  extraConfigurations: {
    '/sandbox.config.json': extendedSandboxConfig
  },
  isServer: true,
  netlify: false,
  mainFile: ['/src/routes/index.html'],
  showOnHomePage: true
});

exports["default"] = _default;
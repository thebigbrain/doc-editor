"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _prettifyDefaultConfig = _interopRequireDefault(require("../../../prettify-default-config"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var config = {
  title: '.prettierrc',
  type: 'prettier',
  description: 'Defines how all files will be prettified by Prettier.',
  moreInfoUrl: 'https://prettier.io/docs/en/configuration.html',
  generateFileFromState: function generateFileFromState(prettierConfig) {
    return JSON.stringify(_objectSpread({}, _prettifyDefaultConfig["default"], {}, prettierConfig || {}), null, 2);
  },
  schema: 'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/prettierrc.json'
};
var _default = config;
exports["default"] = _default;
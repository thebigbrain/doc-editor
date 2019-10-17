"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ConfigWizard = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _elements = require("../elements");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ConfigWizard =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(ConfigWizard, _React$Component);

  function ConfigWizard() {
    var _this;

    (0, _classCallCheck2["default"])(this, ConfigWizard);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ConfigWizard).apply(this, arguments));

    _this.bindValue = function (file, property) {
      return {
        value: file[property],
        setValue: function setValue(value) {
          _this.props.updateFile(JSON.stringify(_objectSpread({}, file, (0, _defineProperty2["default"])({}, property, value)), null, 2));
        }
      };
    };

    return _this;
  }

  (0, _createClass2["default"])(ConfigWizard, [{
    key: "render",
    value: function render() {
      var file = this.props.file;
      var parsedFile;
      var error;

      try {
        parsedFile = JSON.parse(file);
      } catch (e) {
        error = e;
      }

      if (error) {
        return _react["default"].createElement("div", null, "Problem parsing .prettierrc: ", error.message);
      }

      if (!parsedFile) {
        return _react["default"].createElement("div", null, "Could not parse .prettierrc");
      }

      return _react["default"].createElement("div", null, _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.PaddedPreference, (0, _extends2["default"])({
        title: "Print Width",
        type: "number"
      }, this.bindValue(parsedFile, 'printWidth')))), _react["default"].createElement(_elements.ConfigDescription, null, "Specify the line length that the printer will wrap on.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.PaddedPreference, (0, _extends2["default"])({
        title: "Tab Width",
        type: "number"
      }, this.bindValue(parsedFile, 'tabWidth')))), _react["default"].createElement(_elements.ConfigDescription, null, "Specify the number of spaces per indentation-level.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.PaddedPreference, (0, _extends2["default"])({
        title: "Use Tabs",
        type: "boolean"
      }, this.bindValue(parsedFile, 'useTabs')))), _react["default"].createElement(_elements.ConfigDescription, null, "Indent lines with tabs instead of spaces.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.PaddedPreference, (0, _extends2["default"])({
        title: "Semicolons",
        type: "boolean"
      }, this.bindValue(parsedFile, 'semi')))), _react["default"].createElement(_elements.ConfigDescription, null, "Print semicolons at the ends of statements.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.PaddedPreference, (0, _extends2["default"])({
        title: "Use Single Quotes",
        type: "boolean"
      }, this.bindValue(parsedFile, 'singleQuote')))), _react["default"].createElement(_elements.ConfigDescription, null, "Use ", "'", "single", "'", " quotes instead of ", '"', "double", '"', " quotes.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.PaddedPreference, (0, _extends2["default"])({
        title: "Trailing Commas",
        type: "dropdown",
        options: ['none', 'es5', 'all']
      }, this.bindValue(parsedFile, 'trailingComma')))), _react["default"].createElement(_elements.ConfigDescription, null, "Print trailing commas wherever possible.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.PaddedPreference, (0, _extends2["default"])({
        title: "Bracket Spacing",
        type: "boolean"
      }, this.bindValue(parsedFile, 'bracketSpacing')))), _react["default"].createElement(_elements.ConfigDescription, null, "Print spaces between brackets in object literals.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.PaddedPreference, (0, _extends2["default"])({
        title: "JSX Brackets",
        type: "boolean"
      }, this.bindValue(parsedFile, 'jsxBracketSameLine')))), _react["default"].createElement(_elements.ConfigDescription, null, "Put the `", '>', "` of a multi-line JSX element at the end of the last line instead of being alone on the next line.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.PaddedPreference, (0, _extends2["default"])({
        title: "Arrow Function Parentheses",
        type: "dropdown",
        options: ['avoid', 'always']
      }, this.bindValue(parsedFile, 'arrowParens')))), _react["default"].createElement(_elements.ConfigDescription, null, "Include parentheses around a sole arrow function parameter.")));
    }
  }]);
  return ConfigWizard;
}(_react["default"].Component);

exports.ConfigWizard = ConfigWizard;
var _default = {
  ConfigWizard: ConfigWizard
};
exports["default"] = _default;
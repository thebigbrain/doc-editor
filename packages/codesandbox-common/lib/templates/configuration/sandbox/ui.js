"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _sortBy = _interopRequireDefault(require("lodash/sortBy"));

var templates = _interopRequireWildcard(require("../../../templates"));

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

    _this.bindValue = function (file, property, defaultValue) {
      return {
        value: file[property] || defaultValue,
        setValue: function setValue(value) {
          var code = JSON.stringify(_objectSpread({}, file, (0, _defineProperty2["default"])({}, property, value)), null, 2);

          _this.props.updateFile(code);
        }
      };
    };

    return _this;
  }

  (0, _createClass2["default"])(ConfigWizard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          file = _this$props.file,
          sandbox = _this$props.sandbox;
      var parsedFile;
      var error;

      try {
        parsedFile = JSON.parse(file);
      } catch (e) {
        error = e;
      }

      if (error) {
        return _react["default"].createElement("div", null, "Problem parsing sandbox.config.json: ", error.message);
      }

      if (!parsedFile) {
        return _react["default"].createElement("div", null, "Could not parse sandbox.config.json");
      }

      var currentTemplate = templates["default"](sandbox.template); // $FlowIssue: Can't detect difference between filter/no-filter

      var possibleTemplates = Object.keys(templates).filter(function (t) {
        return t !== 'default';
      }).map(function (n) {
        return templates[n];
      });
      var templateOptions = (0, _sortBy["default"])(possibleTemplates.filter(function (template) {
        return template.isServer === currentTemplate.isServer && template.showOnHomePage;
      }), function (template) {
        return template.niceName;
      }).map(function (template) {
        return template.name;
      });
      var templateNameMap = {};
      possibleTemplates.forEach(function (template) {
        templateNameMap[template.name] = template.niceName;
      });
      return _react["default"].createElement("div", null, _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.PaddedPreference, (0, _extends2["default"])({
        title: "Infinite Loop Protection",
        type: "boolean"
      }, this.bindValue(parsedFile, 'infiniteLoopProtection')))), _react["default"].createElement(_elements.ConfigDescription, null, "Whether we should stop execution of the code when we detect an infinite loop.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.PaddedPreference, (0, _extends2["default"])({
        title: "Hard Reload on Change",
        type: "boolean"
      }, this.bindValue(parsedFile, 'hardReloadOnChange')))), _react["default"].createElement(_elements.ConfigDescription, null, "Force refresh the sandbox for a change. This is helpful for sandboxes with global state, like intervals.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.PaddedPreference, (0, _extends2["default"])({
        title: "Template",
        type: "dropdown",
        options: templateOptions,
        mapName: function mapName(name) {
          return templateNameMap[name];
        }
      }, this.bindValue(parsedFile, 'template', currentTemplate.name)))), _react["default"].createElement(_elements.ConfigDescription, null, "Which template to use for this sandbox.")));
    }
  }]);
  return ConfigWizard;
}(_react["default"].Component);

exports.ConfigWizard = ConfigWizard;
var _default = {
  ConfigWizard: ConfigWizard
};
exports["default"] = _default;
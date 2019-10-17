"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _Tooltip = _interopRequireDefault(require("../../components/Tooltip"));

var _PreferenceSwitch = _interopRequireDefault(require("./PreferenceSwitch"));

var _PreferenceDropdown = _interopRequireDefault(require("./PreferenceDropdown"));

var _PreferenceNumber = _interopRequireDefault(require("./PreferenceNumber"));

var _PreferenceText = _interopRequireDefault(require("./PreferenceText"));

var _PreferenceKeybinding = _interopRequireDefault(require("./PreferenceKeybinding"));

var _elements = require("./elements");

var Preference =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(Preference, _React$Component);

  function Preference() {
    var _this;

    (0, _classCallCheck2["default"])(this, Preference);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Preference).apply(this, arguments));

    _this.getOptionComponent = function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          props = _assertThisInitialize.props;

      if (props.type === 'boolean') {
        return _react["default"].createElement(_PreferenceSwitch["default"], (0, _extends2["default"])({}, props, {
          setValue: props.setValue,
          value: props.value
        }));
      }

      if (props.type === 'string') {
        return _react["default"].createElement(_PreferenceText["default"], (0, _extends2["default"])({}, props, {
          setValue: props.setValue,
          value: props.value
        }));
      }

      if (props.type === 'dropdown') {
        return _react["default"].createElement(_PreferenceDropdown["default"], (0, _extends2["default"])({}, props, {
          options: props.options,
          setValue: props.setValue,
          value: props.value
        }));
      }

      if (props.type === 'keybinding') {
        return _react["default"].createElement(_PreferenceKeybinding["default"], (0, _extends2["default"])({}, props, {
          setValue: props.setValue,
          value: props.value
        }));
      }

      return _react["default"].createElement(_PreferenceNumber["default"], (0, _extends2["default"])({}, props, {
        setValue: props.setValue,
        value: props.value
      }));
    };

    return _this;
  }

  (0, _createClass2["default"])(Preference, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          style = _this$props.style,
          className = _this$props.className,
          tooltip = _this$props.tooltip;
      var Title = tooltip ? _react["default"].createElement(_Tooltip["default"], {
        placement: "right",
        content: tooltip
      }, title) : _react["default"].createElement("span", null, title);
      return _react["default"].createElement(_elements.Container, {
        style: style,
        className: className
      }, Title, _react["default"].createElement("div", null, this.getOptionComponent()));
    }
  }]);
  return Preference;
}(_react["default"].Component);

exports["default"] = Preference;
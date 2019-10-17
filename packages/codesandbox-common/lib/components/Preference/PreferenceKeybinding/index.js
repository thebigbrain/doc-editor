"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _KeybindingInput = _interopRequireDefault(require("./KeybindingInput"));

var PreferenceKeybinding =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(PreferenceKeybinding, _React$PureComponent);

  function PreferenceKeybinding() {
    var _this;

    (0, _classCallCheck2["default"])(this, PreferenceKeybinding);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PreferenceKeybinding).apply(this, arguments));

    _this.setValue = function (index) {
      return function (value) {
        var result = (0, _toConsumableArray2["default"])(_this.props.value);
        result[index] = value;

        _this.props.setValue(result);
      };
    };

    return _this;
  }

  (0, _createClass2["default"])(PreferenceKeybinding, [{
    key: "render",
    value: function render() {
      var value = this.props.value;
      return _react["default"].createElement("div", null, _react["default"].createElement(_KeybindingInput["default"], (0, _extends2["default"])({}, this.props, {
        placeholder: "First",
        value: value[0],
        setValue: this.setValue(0)
      })), ' - ', _react["default"].createElement(_KeybindingInput["default"], (0, _extends2["default"])({}, this.props, {
        placeholder: "Second",
        value: value.length === 2 && value[1],
        setValue: this.setValue(1),
        disabled: !value[0] || value[0].length === 0
      })));
    }
  }]);
  return PreferenceKeybinding;
}(_react["default"].PureComponent);

exports["default"] = PreferenceKeybinding;
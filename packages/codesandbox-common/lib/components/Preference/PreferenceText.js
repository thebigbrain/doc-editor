"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _Input = _interopRequireWildcard(require("../Input"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var PreferenceText =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(PreferenceText, _React$PureComponent);

  function PreferenceText() {
    var _this;

    (0, _classCallCheck2["default"])(this, PreferenceText);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PreferenceText).apply(this, arguments));

    _this.handleChange = function (e) {
      var value = e.target.value;

      _this.props.setValue(value);
    };

    return _this;
  }

  (0, _createClass2["default"])(PreferenceText, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          placeholder = _this$props.placeholder,
          isTextArea = _this$props.isTextArea,
          props = (0, _objectWithoutProperties2["default"])(_this$props, ["value", "placeholder", "isTextArea"]);
      return _react["default"].createElement(isTextArea ? _Input.TextArea : _Input["default"], _objectSpread({
        style: {
          width: '9rem'
        },
        value: value,
        placeholder: placeholder,
        onChange: this.handleChange
      }, props));
    }
  }]);
  return PreferenceText;
}(_react["default"].PureComponent);

exports["default"] = PreferenceText;
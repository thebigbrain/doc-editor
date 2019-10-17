"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _elements = require("./elements");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var PreferenceInput =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(PreferenceInput, _React$PureComponent);

  function PreferenceInput() {
    var _this;

    (0, _classCallCheck2["default"])(this, PreferenceInput);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PreferenceInput).apply(this, arguments));

    _this.handleChange = function (e) {
      var value = e.target.value;

      if (!Number.isNaN(+value)) {
        _this.props.setValue(+value);
      }
    };

    return _this;
  }

  (0, _createClass2["default"])(PreferenceInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          style = _this$props.style,
          step = _this$props.step;
      return _react["default"].createElement(_elements.StyledInput, {
        step: step,
        style: _objectSpread({
          width: '3rem'
        }, style),
        type: "number",
        value: value,
        onChange: this.handleChange
      });
    }
  }]);
  return PreferenceInput;
}(_react["default"].PureComponent);

exports["default"] = PreferenceInput;
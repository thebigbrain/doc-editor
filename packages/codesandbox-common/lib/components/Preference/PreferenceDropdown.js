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

var _react = _interopRequireDefault(require("react"));

var _Select = _interopRequireDefault(require("../Select"));

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

      _this.props.setValue(value);
    };

    return _this;
  }

  (0, _createClass2["default"])(PreferenceInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          options = _this$props.options,
          mapName = _this$props.mapName;
      return _react["default"].createElement(_Select["default"], {
        onChange: this.handleChange,
        value: value
      }, options.map(function (op) {
        return _react["default"].createElement("option", {
          key: op,
          value: op
        }, mapName ? mapName(op) : op);
      }));
    }
  }]);
  return PreferenceInput;
}(_react["default"].PureComponent);

exports["default"] = PreferenceInput;
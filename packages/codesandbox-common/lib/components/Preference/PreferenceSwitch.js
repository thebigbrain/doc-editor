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

var _Switch = _interopRequireDefault(require("../Switch"));

var PreferenceSwitch =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(PreferenceSwitch, _React$Component);

  function PreferenceSwitch() {
    var _this;

    (0, _classCallCheck2["default"])(this, PreferenceSwitch);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PreferenceSwitch).apply(this, arguments));

    _this.handleClick = function () {
      _this.props.setValue(!_this.props.value);
    };

    return _this;
  }

  (0, _createClass2["default"])(PreferenceSwitch, [{
    key: "render",
    value: function render() {
      var value = this.props.value;
      return _react["default"].createElement(_Switch["default"], {
        onClick: this.handleClick,
        small: true,
        style: {
          width: '3rem'
        },
        offMode: true,
        secondary: true,
        right: value
      });
    }
  }]);
  return PreferenceSwitch;
}(_react["default"].Component);

exports["default"] = PreferenceSwitch;
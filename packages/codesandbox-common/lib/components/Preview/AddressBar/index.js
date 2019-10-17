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

var _keycodes = require("../../../utils/keycodes");

var _elements = require("./elements");

var _default =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(_default, _React$PureComponent);

  function _default() {
    var _this;

    (0, _classCallCheck2["default"])(this, _default);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(_default).apply(this, arguments));

    _this.onChange = function (evt) {
      var onChange = _this.props.onChange;
      onChange(evt.target.value);
    };

    _this.handleKeyDown = function (e) {
      var onConfirm = _this.props.onConfirm;

      if (e.keyCode === _keycodes.ENTER) {
        onConfirm();
      }
    };

    _this.focus = function () {
      if (_this.input) {
        _this.input.focus();
      }
    };

    return _this;
  }

  (0, _createClass2["default"])(_default, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$url = this.props.url,
          url = _this$props$url === void 0 ? '' : _this$props$url;
      return _react["default"].createElement(_elements.Container, {
        onClick: this.focus
      }, _react["default"].createElement(_elements.InputContainer, null, _react["default"].createElement("input", {
        ref: function ref(e) {
          _this2.input = e;
        },
        onChange: this.onChange,
        onKeyDown: this.handleKeyDown,
        value: url,
        "aria-label": "Address Bar Input"
      })));
    }
  }]);
  return _default;
}(_react["default"].PureComponent);

exports["default"] = _default;
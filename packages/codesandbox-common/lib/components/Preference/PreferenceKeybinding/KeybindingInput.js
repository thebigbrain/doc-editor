"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _Input = _interopRequireDefault(require("../../Input"));

var _keybindings = require("../../../utils/keybindings");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SPECIAL_KEYS = ['Meta', 'Control', 'Alt', 'Shift', 'Enter', 'Backspace'];
var IGNORED_KEYS = ['Backspace', 'Escape', 'CapsLock'];

function sortKeys(keys) {
  return keys.sort(function (a, b) {
    var isASpecial = SPECIAL_KEYS.indexOf(a) > -1;
    var isBSpecial = SPECIAL_KEYS.indexOf(b) > -1;

    if (isASpecial && isBSpecial) {
      return 0;
    }

    if (isASpecial) {
      return -1;
    }

    if (isBSpecial) {
      return 1;
    }

    return 0;
  });
}

var KeybindingInput =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(KeybindingInput, _React$Component);

  function KeybindingInput() {
    var _this;

    (0, _classCallCheck2["default"])(this, KeybindingInput);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(KeybindingInput).apply(this, arguments));
    _this.state = {
      recording: false,
      recordedKeys: []
    };

    _this.handleChange = function (e) {
      var value = e.target.value;

      _this.props.setValue(value);
    };

    _this.keypresses = 0;

    _this.handleKeyDown = function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.key === 'Enter') {
        _this.props.setValue(_this.state.recordedKeys);
      } else if (e.key === 'Backspace') {
        _this.props.setValue(undefined);
      }

      if (e.key === 'Escape' || e.key === 'Enter' || e.key === 'Backspace') {
        _this.setState({
          recordedKeys: []
        });

        e.target.blur();
        return;
      }

      var upperCaseKey = (0, _keybindings.normalizeKey)(e);

      if (_this.state.recordedKeys.indexOf(upperCaseKey) === -1 && IGNORED_KEYS.indexOf(e.key) === -1) {
        _this.keypresses += 1;

        _this.setState(function (state) {
          return {
            recordedKeys: sortKeys([].concat((0, _toConsumableArray2["default"])(state.recordedKeys), [upperCaseKey]))
          };
        });
      }
    };

    _this.handleKeyUp = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.keypresses -= 1;
    };

    _this.handleKeyPress = function (e) {
      e.preventDefault();
      e.stopPropagation();
    };

    _this.handleFocus = function () {
      _this.setState({
        recording: true,
        recordedKeys: []
      });

      document.addEventListener('keydown', _this.handleKeyDown);
      document.addEventListener('keyup', _this.handleKeyUp);
      document.addEventListener('keypress', _this.handleKeyPress);
    };

    _this.handleBlur = function () {
      _this.keypresses = 0;

      if (_this.state.recording) {
        _this.setState({
          recording: false
        });

        document.removeEventListener('keydown', _this.handleKeyDown);
        document.removeEventListener('keyup', _this.handleKeyUp);
        document.removeEventListener('keypress', _this.handleKeyPress);
      }
    };

    return _this;
  }

  (0, _createClass2["default"])(KeybindingInput, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          recording = _this$state.recording,
          recordedKeys = _this$state.recordedKeys;
      var _this$props = this.props,
          value = _this$props.value,
          _this$props$placehold = _this$props.placeholder,
          placeholder = _this$props$placehold === void 0 ? 'Enter Keystroke' : _this$props$placehold;
      var keys = recording ? recordedKeys : value || [];
      return _react["default"].createElement(_Input["default"], {
        style: _objectSpread({
          width: '6rem'
        }, this.props.style),
        value: keys.map(_keybindings.formatKey).join(' + '),
        placeholder: placeholder,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        readOnly: true
      });
    }
  }]);
  return KeybindingInput;
}(_react["default"].Component);

exports["default"] = KeybindingInput;
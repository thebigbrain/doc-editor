"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _elements = require("./elements");

function ProgressButton(_ref) {
  var _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["loading", "disabled"]);
  return _react["default"].createElement(_elements.RelativeButton, (0, _extends2["default"])({
    disabled: disabled || loading
  }, props), props.children, loading && _react["default"].createElement(_elements.Loader, null));
}

var _default = ProgressButton;
exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = function _default(_ref) {
  var _ref$width = _ref.width,
      width = _ref$width === void 0 ? 35 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 35 : _ref$height,
      className = _ref.className,
      style = _ref.style;
  return _react["default"].createElement("svg", {
    "aria-label": "CodeSandbox",
    role: "presentation",
    x: "0px",
    y: "0px",
    className: className,
    width: typeof width === 'number' ? "".concat(width, "px") : width,
    height: typeof height === 'number' ? "".concat(height, "px") : height,
    viewBox: "0 0 1024 1024",
    style: _objectSpread({
      verticalAlign: 'middle'
    }, style)
  }, _react["default"].createElement("title", null, "CodeSandbox"), _react["default"].createElement("g", {
    id: "Layer_1"
  }, _react["default"].createElement("polyline", {
    fill: "currentColor",
    points: "719.001,851 719.001,639.848 902,533.802 902,745.267 719.001,851"
  }), _react["default"].createElement("polyline", {
    fill: "currentColor",
    points: "302.082,643.438 122.167,539.135 122.167,747.741 302.082,852.573 302.082,643.438"
  }), _react["default"].createElement("polyline", {
    fill: "currentColor",
    points: "511.982,275.795 694.939,169.633 512.06,63 328.436,169.987 511.982,275.795"
  })), _react["default"].createElement("g", {
    id: "Layer_2"
  }, _react["default"].createElement("polyline", {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "80",
    strokeMiterlimit: "10",
    points: "899,287.833 509,513 509,963"
  }), _react["default"].createElement("line", {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "80",
    strokeMiterlimit: "10",
    x1: "122.167",
    y1: "289",
    x2: "511.5",
    y2: "513"
  }), _react["default"].createElement("polygon", {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "80",
    strokeMiterlimit: "10",
    points: "121,739.083 510.917,963.042 901,738.333 901,288 511,62 121,289"
  })));
};

exports["default"] = _default;
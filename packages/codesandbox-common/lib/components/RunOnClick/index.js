"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Fullscreen = _interopRequireDefault(require("../flex/Fullscreen"));

var _Centered = _interopRequireDefault(require("../flex/Centered"));

var _theme = _interopRequireDefault(require("../../theme"));

var _play = _interopRequireDefault(require("./play.svg"));

var RunOnClick = function RunOnClick(_ref) {
  var onClick = _ref.onClick;
  return _react["default"].createElement(_Fullscreen["default"], {
    style: {
      backgroundColor: _theme["default"].primary(),
      cursor: 'pointer'
    },
    onClick: onClick
  }, _react["default"].createElement(_Centered["default"], {
    horizontal: true,
    vertical: true
  }, _react["default"].createElement("img", {
    width: 170,
    height: 170,
    src: _play["default"],
    alt: "Run Sandbox"
  }), _react["default"].createElement("div", {
    style: {
      color: _theme["default"].red(),
      fontSize: '2rem',
      fontWeight: 700,
      marginTop: 24,
      textTransform: 'uppercase'
    }
  }, "Click to run")));
};

var _default = RunOnClick;
exports["default"] = _default;
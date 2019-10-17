"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _eye = _interopRequireDefault(require("react-icons/lib/fa/eye"));

var _repoForked = _interopRequireDefault(require("react-icons/lib/go/repo-forked"));

var _heart = _interopRequireDefault(require("react-icons/lib/go/heart"));

var _Stat = _interopRequireDefault(require("./Stat"));

var _elements = require("./elements");

function StatsComponent(_ref) {
  var viewCount = _ref.viewCount,
      likeCount = _ref.likeCount,
      forkCount = _ref.forkCount,
      _ref$vertical = _ref.vertical,
      vertical = _ref$vertical === void 0 ? false : _ref$vertical,
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? false : _ref$text,
      style = _ref.style,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["viewCount", "likeCount", "forkCount", "vertical", "text", "style"]);
  return _react["default"].createElement(_elements.Stats, (0, _extends2["default"])({
    vertical: vertical
  }, props), _react["default"].createElement(_Stat["default"], {
    text: text ? 'views' : undefined,
    textOne: text ? 'view' : undefined,
    vertical: vertical,
    Icon: _react["default"].createElement(_eye["default"], null),
    count: viewCount
  }), _react["default"].createElement(_Stat["default"], {
    text: text ? 'likes' : undefined,
    textOne: text ? 'like' : undefined,
    vertical: vertical,
    Icon: _react["default"].createElement(_heart["default"], null),
    count: likeCount
  }), _react["default"].createElement(_Stat["default"], {
    text: text ? 'forks' : undefined,
    textOne: text ? 'fork' : undefined,
    vertical: vertical,
    Icon: _react["default"].createElement(_repoForked["default"], null),
    count: forkCount
  }));
}

var _default = StatsComponent;
exports["default"] = _default;
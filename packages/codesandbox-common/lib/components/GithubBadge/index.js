"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _markGithub = _interopRequireDefault(require("react-icons/lib/go/mark-github"));

var _elements = require("./elements");

var DivOrA = function DivOrA(_ref) {
  var href = _ref.href,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["href"]);
  return href ? _react["default"].createElement(_elements.StyledA, (0, _extends2["default"])({
    target: "_blank",
    rel: "noopener noreferrer",
    href: href
  }, props)) : _react["default"].createElement("div", props);
};

var GithubBadge = function GithubBadge(_ref2) {
  var username = _ref2.username,
      repo = _ref2.repo,
      url = _ref2.url,
      branch = _ref2.branch,
      props = (0, _objectWithoutProperties2["default"])(_ref2, ["username", "repo", "url", "branch"]);
  return _react["default"].createElement(DivOrA, (0, _extends2["default"])({}, props, {
    href: url
  }), _react["default"].createElement(_elements.BorderRadius, {
    hasUrl: Boolean(url)
  }, _react["default"].createElement(_elements.Icon, null, _react["default"].createElement(_markGithub["default"], null)), _react["default"].createElement(_elements.Text, null, username, "/", repo, branch && branch !== 'master' ? "@".concat(branch) : '')));
};

var _default = GithubBadge;
exports["default"] = _default;
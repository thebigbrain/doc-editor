"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserWithAvatar = UserWithAvatar;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _ContributorsBadge = _interopRequireDefault(require("../ContributorsBadge"));

var _PatronStar = require("../PatronStar");

var _elements = require("./elements");

function UserWithAvatar(_ref) {
  var avatarUrl = _ref.avatarUrl,
      username = _ref.username,
      name = _ref.name,
      hideBadge = _ref.hideBadge,
      subscriptionSince = _ref.subscriptionSince,
      useBigName = _ref.useBigName,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["avatarUrl", "username", "name", "hideBadge", "subscriptionSince", "useBigName"]);
  return _react["default"].createElement(_elements.CenteredText, props, avatarUrl && _react["default"].createElement(_elements.Image, {
    src: avatarUrl,
    alt: username
  }), _react["default"].createElement(_elements.AuthorName, {
    useBigName: useBigName
  }, _react["default"].createElement(_elements.Names, null, name && _react["default"].createElement("div", null, name), username && _react["default"].createElement(_elements.Username, {
    hasTwoNames: name && Boolean(username)
  }, username)), subscriptionSince && _react["default"].createElement(_PatronStar.PatronStar, {
    style: {
      fontSize: '1.125em',
      marginBottom: '0.1em'
    },
    subscriptionSince: subscriptionSince
  }), !hideBadge && _react["default"].createElement(_ContributorsBadge["default"], {
    style: {
      margin: '0 .5rem',
      fontSize: '1.25em'
    },
    username: username
  })));
}
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTemplate = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var Icons = _interopRequireWildcard(require("@codesandbox/template-icons"));

var _color = _interopRequireDefault(require("color"));

var _icons = _interopRequireDefault(require("../../templates/icons"));

var _keycodes = require("../../utils/keycodes");

var _elements = require("./elements");

var _getSandboxName = require("../../utils/get-sandbox-name");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var UserTemplate = function UserTemplate(_ref) {
  var template = _ref.template,
      selectTemplate = _ref.selectTemplate,
      small = _ref.small;
  var Icon = template.iconUrl && Icons[template.iconUrl] ? Icons[template.iconUrl] : (0, _icons["default"])(template.sandbox.source.template);

  var select = function select() {
    return selectTemplate(_objectSpread({}, template, {
      shortid: template.sandbox.alias || template.sandbox.id
    }));
  };

  return _react["default"].createElement(_elements.Button, {
    onClick: select,
    color: (0, _color["default"])(template.color),
    custom: true,
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === _keycodes.ENTER) {
        select();
      }
    },
    tabIndex: 0
  }, _react["default"].createElement(_elements.IconContainer, null, _react["default"].createElement(Icon, {
    width: small ? 24 : 32,
    height: small ? 24 : 32
  })), _react["default"].createElement(_elements.Title, null, (0, _getSandboxName.getSandboxName)(template.sandbox)));
};

exports.UserTemplate = UserTemplate;
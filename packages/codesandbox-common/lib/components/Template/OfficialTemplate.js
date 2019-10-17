"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OfficialTemplate = void 0;

var _react = _interopRequireWildcard(require("react"));

var _icons = _interopRequireDefault(require("../../templates/icons"));

var _keycodes = require("../../utils/keycodes");

var _elements = require("./elements");

var OfficialTemplate = function OfficialTemplate(_ref) {
  var template = _ref.template,
      selectTemplate = _ref.selectTemplate,
      small = _ref.small;
  var Icon = (0, _icons["default"])(template.name);
  var select = (0, _react.useCallback)(function () {
    selectTemplate(template);
  }, [selectTemplate, template]);
  return _react["default"].createElement(_elements.Button, {
    onClick: select,
    color: template.color,
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === _keycodes.ENTER) {
        select();
      }
    },
    tabIndex: 0
  }, _react["default"].createElement(_elements.IconContainer, null, _react["default"].createElement(Icon, {
    width: small ? 24 : 32,
    height: small ? 24 : 32
  })), _react["default"].createElement("div", {
    style: {
      width: '100%'
    }
  }, _react["default"].createElement(_elements.Title, null, template.niceName)));
};

exports.OfficialTemplate = OfficialTemplate;
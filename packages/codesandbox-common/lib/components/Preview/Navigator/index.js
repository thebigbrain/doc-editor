"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _angleLeft = _interopRequireDefault(require("react-icons/lib/fa/angle-left"));

var _angleRight = _interopRequireDefault(require("react-icons/lib/fa/angle-right"));

var _refresh = _interopRequireDefault(require("react-icons/lib/md/refresh"));

var _Switch = _interopRequireDefault(require("../../Switch"));

var _Tooltip = _interopRequireDefault(require("../../Tooltip"));

var _AddressBar = _interopRequireDefault(require("../AddressBar"));

var _ExternalOpen = _interopRequireDefault(require("./ExternalOpen"));

var _elements = require("./elements");

function Navigator(_ref) {
  var url = _ref.url,
      onChange = _ref.onChange,
      onConfirm = _ref.onConfirm,
      onBack = _ref.onBack,
      onForward = _ref.onForward,
      onRefresh = _ref.onRefresh,
      isProjectView = _ref.isProjectView,
      toggleProjectView = _ref.toggleProjectView,
      openNewWindow = _ref.openNewWindow,
      zenMode = _ref.zenMode;
  return _react["default"].createElement(_elements.Container, {
    className: "flying-container-handler",
    style: {
      cursor: 'move'
    }
  }, _react["default"].createElement(_elements.Icons, null, _react["default"].createElement(_elements.Icon, {
    "aria-label": "Go Back",
    disabled: !onBack,
    onClick: onBack
  }, _react["default"].createElement(_angleLeft["default"], null)), _react["default"].createElement(_elements.Icon, {
    "aria-label": "Go Forward",
    disabled: !onForward,
    onClick: onForward
  }, _react["default"].createElement(_angleRight["default"], null)), _react["default"].createElement(_elements.Icon, {
    "aria-label": "Refresh",
    onClick: onRefresh
  }, _react["default"].createElement(_refresh["default"], null))), _react["default"].createElement(_elements.AddressBarContainer, {
    onMouseDown: function onMouseDown(e) {
      e.stopPropagation();
    }
  }, _react["default"].createElement(_AddressBar["default"], {
    url: url,
    onChange: onChange,
    onConfirm: onConfirm
  })), openNewWindow && _react["default"].createElement(_elements.Icon, {
    style: {
      fontSize: 18,
      padding: 4,
      marginRight: zenMode ? 8 : 16
    },
    onClick: openNewWindow
  }, _react["default"].createElement(_Tooltip["default"], {
    delay: 0,
    content: "Open In New Window"
  }, _react["default"].createElement(_ExternalOpen["default"], null))), !zenMode && toggleProjectView && _react["default"].createElement(_elements.SwitchContainer, null, _react["default"].createElement(_Tooltip["default"], {
    delay: 0,
    content: isProjectView ? 'Project View' : 'Current Module View',
    placement: "left"
  }, _react["default"].createElement(_Switch["default"], {
    offMode: true,
    secondary: true,
    small: true,
    right: !isProjectView,
    onClick: toggleProjectView
  }))));
}

var _default = Navigator;
exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Tags = _interopRequireDefault(require("../Tags"));

var _elements = require("../SandboxCard/elements");

var _elements2 = require("./elements");

var _getSandboxName = require("../../utils/get-sandbox-name");

var BANNER = 'https://codesandbox.io/static/img/banner.png';

var SCREENSHOT_API_URL = function SCREENSHOT_API_URL(id) {
  return "https://codesandbox.io/api/v1/sandboxes/".concat(id, "/screenshot.png");
};

var CustomTemplate = function CustomTemplate(_ref) {
  var template = _ref.template,
      onClick = _ref.onClick,
      i = _ref.i;

  if (!template) {
    return _react["default"].createElement(_elements2.MyTemplate, {
      key: i
    }, _react["default"].createElement("img", {
      height: "109px",
      alt: "loading",
      src: BANNER
    }), _react["default"].createElement(_elements2.Border, null), _react["default"].createElement("div", null, _react["default"].createElement(_elements2.TemplateTitle, null, "Loading")));
  }

  var sandbox = template.sandbox;
  var title = (0, _getSandboxName.getSandboxName)(sandbox);
  return _react["default"].createElement(_elements2.MyTemplate, {
    key: i,
    onClick: onClick,
    overlayHeight: 109
  }, _react["default"].createElement("img", {
    height: "109px",
    src: process.env.NODE_ENV === 'development' ? BANNER : SCREENSHOT_API_URL(sandbox.id) || BANNER,
    alt: title
  }), _react["default"].createElement(_elements.Overlay, null, _react["default"].createElement(_elements.SandboxDescription, null, sandbox.description), sandbox.tags && _react["default"].createElement(_Tags["default"], {
    tags: sandbox.tags
  })), _react["default"].createElement(_elements2.Border, {
    color: template.color
  }), _react["default"].createElement("div", null, _react["default"].createElement(_elements2.TemplateTitle, null, title), _react["default"].createElement(_elements2.TemplateSubTitle, null, sandbox.description)));
};

var _default = CustomTemplate;
exports["default"] = _default;
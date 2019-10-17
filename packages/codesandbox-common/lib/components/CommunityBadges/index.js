"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _IconBase = _interopRequireDefault(require("react-icons/lib/IconBase"));

var _color = _interopRequireDefault(require("color"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _icons = _interopRequireDefault(require("../../templates/icons"));

var _templates = _interopRequireDefault(require("../../templates"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  max-width: 30%;\n  left: 50%;\n  position: absolute;\n  top: 6px;\n  transform: translateX(-50%);\n\n  svg,\n  img {\n    max-width: 100%;\n    filter: grayscale(0.4);\n    height: auto;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var IconContainer = _styledComponents["default"].div(_templateObject());

var _default = function _default(_ref) {
  var style = _ref.style,
      sandboxesNumber = _ref.sandboxesNumber,
      template = _ref.template;
  var templateInfo = (0, _templates["default"])(template);
  var color = templateInfo.color();
  var lighter = (0, _color["default"])(color).lighten(0.2).rgb();
  var Icon = (0, _icons["default"])(template);
  return sandboxesNumber >= 50 ? _react["default"].createElement(_Tooltip["default"], {
    style: {
      display: 'flex',
      position: 'relative'
    },
    content: "".concat(sandboxesNumber < 100 ? 'Silver' : 'Gold', " medal for ").concat(templateInfo.niceName)
  }, _react["default"].createElement(_IconBase["default"], {
    style: style,
    width: "1em",
    height: "0.67em",
    viewBox: "0 0 204 320",
    fill: "none"
  }, _react["default"].createElement("path", {
    d: "M162.478 320V182H102v104.895L162.478 320z",
    fill: color
  }), _react["default"].createElement("path", {
    d: "M41.522 319.628V182H102v105.639l-60.478 31.989z",
    fill: "rgb(".concat(lighter.r, ",").concat(lighter.g, ",").concat(lighter.b, ")")
  }), _react["default"].createElement("circle", {
    cx: 102,
    cy: "102.355",
    r: 102,
    transform: "rotate(180 102 102.355)",
    fill: sandboxesNumber < 100 ? '#EBEBEB' : '#EAC17A'
  }), _react["default"].createElement("circle", {
    cx: 102,
    cy: "102.355",
    r: "92.7273",
    transform: "rotate(180 102 102.355)",
    fill: sandboxesNumber < 100 ? '#C8C8C8' : '#CFAE72'
  })), _react["default"].createElement(IconContainer, null, _react["default"].createElement(Icon, null))) : null;
};

exports["default"] = _default;
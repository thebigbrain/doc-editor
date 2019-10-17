"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = exports.AButton = exports.LinkButton = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _theme = _interopRequireDefault(require("../../theme"));

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n          padding: 0.65em 2.25em;\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n          padding: 0.5em 0.7em;\n          font-size: 0.875em;\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  transition: 0.3s ease all;\n  font-family: Poppins, Roboto, sans-serif;\n\n  border: none;\n  outline: none;\n  ", ";\n  background-size: 720%;\n\n  border: ", ";\n  border-radius: 4px;\n\n  box-sizing: border-box;\n  font-size: 1.125em;\n  text-align: center;\n  color: ", ";\n  font-weight: 600;\n  width: ", ";\n\n  user-select: none;\n  text-decoration: none;\n\n  ", ";\n\n  /* svg {\n     font-size: 1.125em;\n  } */\n\n  ", ";\n\n  &:hover {\n    ", ";\n    ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var getBackgroundColor = function getBackgroundColor(_ref) {
  var internalTheme = _ref.theme,
      disabled = _ref.disabled,
      red = _ref.red,
      secondary = _ref.secondary,
      danger = _ref.danger;
  if (disabled) return "background-color: ".concat(internalTheme.light ? 'rgba(0, 0, 0, 0.4)' : _theme["default"].background2.darken(0.3)());
  if (danger) return "background-color: ".concat(_theme["default"].dangerBackground());
  if (secondary) return "background-color: transparent";
  if (red) return "background-color: ".concat(_theme["default"].red.darken(0.2)());

  if (internalTheme && internalTheme['button.background']) {
    return "background-color: ".concat(internalTheme['button.background']);
  }

  return "background-color: #40A9F3;";
};

var getBackgroundHoverColor = function getBackgroundHoverColor(_ref2) {
  var internalTheme = _ref2.theme,
      disabled = _ref2.disabled,
      red = _ref2.red,
      secondary = _ref2.secondary,
      danger = _ref2.danger;
  if (disabled) return "background-color: ".concat(internalTheme.light ? 'rgba(0, 0, 0, 0.4)' : _theme["default"].background2.darken(0.3)());
  if (danger) return "background-color: #E25D6A";
  if (secondary) return "background-color: #66b9f4";
  if (red) return "background-color: #F27777";

  if (internalTheme && internalTheme['button.hoverBackground']) {
    return "background-color: ".concat(internalTheme['button.hoverBackground']);
  }

  return "background-color: #66b9f4;";
};

var getColor = function getColor(_ref3) {
  var disabled = _ref3.disabled,
      secondary = _ref3.secondary,
      internalTheme = _ref3.theme;
  if (disabled) return _theme["default"].background2.lighten(1.5)();
  if (secondary) return internalTheme.light ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.75)';
  return 'white';
};

var getHoverColor = function getHoverColor(_ref4) {
  var secondary = _ref4.secondary,
      disabled = _ref4.disabled;
  if (disabled) return '';
  if (secondary) return 'color: white';
  return '';
};

var getBorder = function getBorder(_ref5) {
  var internalTheme = _ref5.theme,
      secondary = _ref5.secondary,
      danger = _ref5.danger,
      red = _ref5.red,
      disabled = _ref5.disabled;
  if (disabled) return internalTheme.light ? '2px solid rgba(0, 0, 0, 0.3)' : '2px solid #161A1C';
  if (secondary) return "2px solid #66B9F4";
  if (red) return '2px solid #F27777';
  if (danger) return '2px solid #E25D6A';

  if (internalTheme && internalTheme['button.hoverBackground']) {
    return "2px solid ".concat(internalTheme['button.hoverBackground']);
  }

  return '2px solid #66B9F4';
};

var styles = (0, _styledComponents.css)(_templateObject(), function (props) {
  return getBackgroundColor(props);
}, function (props) {
  return getBorder(props);
}, function (props) {
  return getColor(props);
}, function (props) {
  return props.block ? '100%' : 'inherit';
}, function (props) {
  return props.small ? (0, _styledComponents.css)(_templateObject2()) : (0, _styledComponents.css)(_templateObject3());
}, function (props) {
  return !props.disabled && "\n  cursor: pointer;\n  ";
}, function (props) {
  return getBackgroundHoverColor(props);
}, function (props) {
  return getHoverColor(props);
});
var LinkButton = (0, _styledComponents["default"])(_reactRouterDom.Link)(_templateObject4(), styles);
exports.LinkButton = LinkButton;

var AButton = _styledComponents["default"].a(_templateObject5(), styles);

exports.AButton = AButton;

var Button = _styledComponents["default"].button(_templateObject6(), styles);

exports.Button = Button;
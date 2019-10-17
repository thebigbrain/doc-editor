"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 100%;\n  max-width: ", "px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      @media (max-width: 768px) {\n        padding: 0;\n      }\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  box-sizing: border-box;\n  display: flex;\n\n  padding: 0 2rem;\n\n  width: 100%;\n  justify-content: center;\n\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Container = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.responsive && (0, _styledComponents.css)(_templateObject2());
});

var InnerContainer = _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.width;
});

var _default = function _default(_ref) {
  var children = _ref.children,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 1280 : _ref$width,
      className = _ref.className,
      _ref$responsive = _ref.responsive,
      responsive = _ref$responsive === void 0 ? false : _ref$responsive;
  return _react["default"].createElement(Container, {
    responsive: responsive
  }, _react["default"].createElement(InnerContainer, {
    className: className,
    width: width
  }, children));
};

exports["default"] = _default;
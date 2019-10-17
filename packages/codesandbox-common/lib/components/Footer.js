"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _MaxWidth = _interopRequireDefault(require("./flex/MaxWidth"));

var _media = _interopRequireDefault(require("../utils/media"));

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  background-color: ", ";\n  padding: 1rem;\n  z-index: 5;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: rgba(255, 255, 255, 0.7);\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n\n  li {\n    a {\n      transition: 0.3s ease color;\n      text-decoration: none;\n      color: rgba(255, 255, 255, 0.7);\n\n      &:hover {\n        color: rgba(255, 255, 255, 0.9);\n      }\n    }\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: 1.125rem;\n  font-weight: 400;\n  margin: 0;\n  margin-bottom: 1rem;\n\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    width: 100%;\n    margin-bottom: 1rem;\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: calc(33% - 2rem);\n  margin: 0 1rem;\n\n  ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  justify-content: space-around;\n  width: 100%;\n  padding-top: 5rem;\n  padding-bottom: 3rem;\n  flex-wrap: wrap;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Container = _styledComponents["default"].div(_templateObject());

var Column = _styledComponents["default"].div(_templateObject2(), _media["default"].phone(_templateObject3()));

var Title = _styledComponents["default"].h5(_templateObject4(), function (_ref) {
  var theme = _ref.theme;
  return theme.secondary;
});

var List = _styledComponents["default"].ul(_templateObject5());

var Background = _styledComponents["default"].div(_templateObject6(), function (props) {
  return props.theme.background2.darken(0.2);
});

var _default = function _default() {
  return _react["default"].createElement(Background, {
    id: "footer"
  }, _react["default"].createElement(_MaxWidth["default"], {
    width: 1280
  }, _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(Container, null, _react["default"].createElement(Column, null, _react["default"].createElement(Title, null, "CodeSandbox"), _react["default"].createElement(List, null, _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "/s",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Create Sandbox")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "/search",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Search")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "/explore",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Explore")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "/docs"
  }, "Documentation")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "/patron",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Patron")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "https://status.codesandbox.io",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Status")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "/signin",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Sign In")))), _react["default"].createElement(Column, null, _react["default"].createElement(Title, null, "About"), _react["default"].createElement(List, null, _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "/blog",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Blog")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "https://github.com/codesandbox/codesandbox-client",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "GitHub")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "/jobs"
  }, "Careers")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "/legal"
  }, "Legal")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "mailto:hello@codesandbox.io"
  }, "Contact Us")))), _react["default"].createElement(Column, null, _react["default"].createElement(Title, null, "Social"), _react["default"].createElement(List, null, _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "https://twitter.com/codesandbox",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Twitter")), _react["default"].createElement("li", null, _react["default"].createElement("a", {
    href: "https://spectrum.chat/codesandbox",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Spectrum"))))))));
};

exports["default"] = _default;
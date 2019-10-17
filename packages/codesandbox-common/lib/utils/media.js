"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = require("styled-components");

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    @media (min-width: 1280px) {\n      ", ";\n    }\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    @media (min-width: 660px) {\n      ", ";\n    }\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    @media (max-width: 660px) {\n      ", ";\n    }\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    @media (max-width: 1279px) {\n      ", ";\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = {
  tablet: function tablet() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _styledComponents.css)(_templateObject(), _styledComponents.css.call.apply(_styledComponents.css, [undefined].concat(args)));
  },
  phone: function phone() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (0, _styledComponents.css)(_templateObject2(), _styledComponents.css.call.apply(_styledComponents.css, [undefined].concat(args)));
  },
  fromTablet: function fromTablet() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (0, _styledComponents.css)(_templateObject3(), _styledComponents.css.call.apply(_styledComponents.css, [undefined].concat(args)));
  },
  fromDesktop: function fromDesktop() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return (0, _styledComponents.css)(_templateObject4(), _styledComponents.css.call.apply(_styledComponents.css, [undefined].concat(args)));
  }
};
exports["default"] = _default;
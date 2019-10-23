"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.decorateSelector = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _color = _interopRequireDefault(require("color"));

var _codesandbox = _interopRequireDefault(require("./themes/codesandbox.json"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var colorMethods = ['negate', 'lighten', 'darken', 'saturate', 'desaturate', 'greyscale', 'whiten', 'blacken', 'fade', 'opaquer', 'rotate'];
/**
 * Takes a selector that returns a color string and returns new decorated selector that calls the
 * original function to get the color and then modifies that color, ultimately returning another
 * color string.
 *
 * vy60q8l043
 */

var addModifier = function addModifier(fn, method) {
  for (var _len = arguments.length, modifierArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    modifierArgs[_key - 2] = arguments[_key];
  }

  return function () {
    var _Color;

    return (_Color = (0, _color["default"])(fn.apply(void 0, arguments)))[method].apply(_Color, modifierArgs).string();
  };
};
/**
 * Add useful methods directly to selector function, as well as put an string() call at the end
 * @param selector
 */


var decorateSelector = function decorateSelector(selector) {
  // add member functions to our selector
  colorMethods.forEach(function (method) {
    selector[method] = (0, _memoizeOne["default"])(function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return decorateSelector(addModifier.apply(void 0, [selector, method].concat(args)));
    });
  });
  selector['clearer'] = selector['fade'];
  return selector;
};

exports.decorateSelector = decorateSelector;

function createTheme(colors) {
  var transformed = Object.keys(colors).map(function (c) {
    return {
      key: c,
      value: colors[c]
    };
  }).map(function (_ref) {
    var key = _ref.key,
        value = _ref.value;
    return {
      key: key,
      value: decorateSelector(function () {
        return value;
      })
    };
  }).reduce(function (prev, _ref2) {
    var key = _ref2.key,
        value = _ref2.value;
    return _objectSpread({}, prev, (0, _defineProperty2["default"])({}, key, value));
  }, {});
  return transformed;
}

var theme = _objectSpread({}, createTheme({
  background: '#24282A',
  background2: '#1C2022',
  background3: '#374140',
  background4: '#141618',
  background5: '#111518',
  primary: '#FFD399',
  primaryText: '#7F694C',
  lightText: '#F2F2F2',
  secondary: '#40A9F3',
  shySecondary: '#66b9f4',
  darkBlue: '#1081D0',
  white: '#E0E0E0',
  gray: '#C0C0C0',
  black: '#74757D',
  green: '#5da700',
  redBackground: '#400000',
  red: '#F27777',
  dangerBackground: '#DC3545',
  sidebar: '#191d1f',
  placeholder: '#B8B9BA',
  link: '#40a9f3'
}), {
  vscodeTheme: _codesandbox["default"],
  "new": createTheme({
    title: '#EEEEFF',
    description: '#777788',
    bg: '#2B2E41'
  })
});

var _default = theme;
exports["default"] = _default;
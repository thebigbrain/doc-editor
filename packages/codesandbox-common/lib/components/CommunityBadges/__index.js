"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("jest-styled-components");

var _react = _interopRequireDefault(require("react"));

var _themeMount = _interopRequireDefault(require("../../test/themeMount"));

var _ = _interopRequireDefault(require("."));

var templates = ['create-react-app', 'vue-cli', 'preact-cli', 'svelte', 'create-react-app-typescript', 'angular-cli', 'parcel', 'cxjs', '@dojo/cli-create-app', 'gatsby', 'nuxt', 'next', 'reason', 'apollo', 'sapper', 'nest', 'static', 'styleguidist'];

var FrameworkBadge = function FrameworkBadge(_ref) {
  var template = _ref.template,
      _ref$sandboxNumber = _ref.sandboxNumber,
      sandboxNumber = _ref$sandboxNumber === void 0 ? 100 : _ref$sandboxNumber;
  return _react["default"].createElement("div", {
    style: {
      width: 64,
      height: 50
    }
  }, _react["default"].createElement(_["default"], {
    sandboxesNumber: sandboxNumber,
    style: {
      width: 64,
      height: 50
    },
    template: template
  }));
};

describe('<Checkbox /> rendering', function () {
  templates.map(function (t) {
    return it("gold ".concat(t), function () {
      expect((0, _themeMount["default"])(_react["default"].createElement(FrameworkBadge, {
        template: t
      }))).toMatchSnapshot();
    });
  });
  templates.map(function (t) {
    return it("silver ".concat(t), function () {
      expect((0, _themeMount["default"])(_react["default"].createElement(FrameworkBadge, {
        template: t,
        sandboxNumber: 51
      }))).toMatchSnapshot();
    });
  });
});
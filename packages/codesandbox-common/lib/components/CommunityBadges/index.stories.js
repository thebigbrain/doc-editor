"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

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

templates.map(function (t) {
  return (0, _react2.storiesOf)('components/Community Badge/Gold', module).add(t, function () {
    return _react["default"].createElement(FrameworkBadge, {
      template: t
    });
  });
});
templates.map(function (t) {
  return (0, _react2.storiesOf)('components/Community Badge/Silver', module).add(t, function () {
    return _react["default"].createElement(FrameworkBadge, {
      sandboxNumber: 51,
      template: t
    });
  });
});
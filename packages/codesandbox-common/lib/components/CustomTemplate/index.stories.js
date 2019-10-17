"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _ = _interopRequireDefault(require("."));

var _fixtures = require("../SandboxCard/fixtures");

var template = function template() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    id: '2321',
    color: '#fff',
    sandbox: (0, _fixtures.sandbox)(props)
  };
};

var stories = (0, _react2.storiesOf)('components/CustomTemplate', module);
stories.add('Default', function () {
  return _react["default"].createElement(_["default"], {
    template: (0, _addonKnobs.object)('template', template())
  });
}).add('No Title', function () {
  return _react["default"].createElement(_["default"], {
    template: (0, _addonKnobs.object)('template', template({
      title: null
    }))
  });
}).add('No Description', function () {
  return _react["default"].createElement(_["default"], {
    template: (0, _addonKnobs.object)('template', template({
      description: null
    }))
  });
}).add('No Tags', function () {
  return _react["default"].createElement(_["default"], {
    template: (0, _addonKnobs.object)('template', template({
      tags: []
    }))
  });
});
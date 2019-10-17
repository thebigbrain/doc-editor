"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _mocks = require("../../test/mocks");

var _ = _interopRequireDefault(require("."));

var _keybindings = require("../../utils/keybindings");

var stories = (0, _react2.storiesOf)('components/Preference', module);
var keyBindingKeys = Object.keys(_keybindings.KEYBINDINGS);
stories.add('Boolean Preference', function () {
  return _react["default"].createElement(_["default"], {
    setValue: _mocks.noop,
    value: false,
    title: "Vim Mode?",
    type: "boolean"
  });
}).add('String Preference', function () {
  return _react["default"].createElement(_["default"], {
    setValue: _mocks.noop,
    title: "Whats your name?",
    type: "string",
    value: "Test"
  });
}).add('Keybinding Preference', function () {
  return keyBindingKeys.map(function (id, i) {
    return _react["default"].createElement(_["default"], {
      setValue: _mocks.noop,
      key: id,
      title: _keybindings.KEYBINDINGS[id].title,
      value: _keybindings.KEYBINDINGS[id].bindings,
      type: "keybinding"
    });
  });
}).add('Dropdown Preference', function () {
  return _react["default"].createElement(_["default"], {
    title: "Select your editor",
    setValue: _mocks.noop,
    type: "dropdown",
    value: "one",
    options: ['one', 'two']
  });
});
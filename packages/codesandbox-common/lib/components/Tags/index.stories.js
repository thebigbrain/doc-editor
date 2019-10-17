"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _ = _interopRequireDefault(require("."));

(0, _react2.storiesOf)('components/Tags', module).add('One tag', function () {
  return _react["default"].createElement(_["default"], {
    tags: (0, _addonKnobs.array)('tags', ['one'])
  });
}).add('Many tags', function () {
  return _react["default"].createElement(_["default"], {
    tags: (0, _addonKnobs.array)('tags', ['one', 'two', 'three', 'four', 'five'])
  });
}).add('Many tags', function () {
  return _react["default"].createElement(_["default"], {
    tags: (0, _addonKnobs.array)('tags', ['one', 'two', 'three', 'four', 'five']),
    align: (0, _addonKnobs.select)('align', ['right', 'left'], 'right')
  });
});
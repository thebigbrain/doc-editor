"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _addonKnobs = require("@storybook/addon-knobs");

var _ = _interopRequireDefault(require("."));

var fixtures = _interopRequireWildcard(require("../SandboxCard/fixtures"));

var authorWithKnobs = function authorWithKnobs(group) {
  var author = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var knobs = {
    username: (0, _addonKnobs.text)('author.username', author && author.username, group),
    avatar_url: (0, _addonKnobs.text)('author.avatar_url', author && author.avatar_url, group)
  };

  if (knobs.username !== null || knobs.avatar_url !== null) {
    return knobs;
  }

  return author;
};

var sandboxWithKnobs = function sandboxWithKnobs(group, sandbox) {
  return {
    id: (0, _addonKnobs.text)('id', sandbox.id, group),
    title: (0, _addonKnobs.text)('title', sandbox.title, group),
    author: authorWithKnobs(group, sandbox.author),
    description: (0, _addonKnobs.text)('description', sandbox.description, group),
    screenshot_url: (0, _addonKnobs.text)('screenshot_url', sandbox.screenshot_url, group),
    view_count: (0, _addonKnobs.number)('view_count', sandbox.view_count, {}, group),
    fork_count: (0, _addonKnobs.number)('fork_count', sandbox.fork_count, {}, group),
    like_count: (0, _addonKnobs.number)('like_count', sandbox.like_count, {}, group),
    template: (0, _addonKnobs.select)('template', fixtures.templateOptions, sandbox.template, group),
    tags: (0, _addonKnobs.array)('tags', sandbox.tags, ',', group)
  };
};

var createSandboxStory = function createSandboxStory(_ref) {
  var _ref$sandbox = _ref.sandbox,
      sandbox = _ref$sandbox === void 0 ? fixtures.sandbox() : _ref$sandbox,
      _ref$selectSandbox = _ref.selectSandbox,
      selectSandbox = _ref$selectSandbox === void 0 ? (0, _addonActions.action)('selectSandbox') : _ref$selectSandbox,
      small = _ref.small,
      noHeight = _ref.noHeight,
      defaultHeight = _ref.defaultHeight,
      noMargin = _ref.noMargin;
  return function () {
    return _react["default"].createElement(_["default"], {
      sandbox: sandboxWithKnobs('sandbox', sandbox),
      selectSandbox: selectSandbox,
      small: (0, _addonKnobs["boolean"])('small', small),
      noHeight: (0, _addonKnobs["boolean"])('noHeight', noHeight),
      defaultHeight: (0, _addonKnobs.number)('defaultHeight', defaultHeight),
      noMargin: (0, _addonKnobs["boolean"])('noMargin', noMargin)
    });
  };
};

(0, _react2.storiesOf)('components/WideSandbox', module).add('basic', createSandboxStory({})).add('small', createSandboxStory({
  small: true
})).add('no height', createSandboxStory({
  noHeight: true
})).add('default height', createSandboxStory({
  defaultHeight: 500
})).add('no margin', createSandboxStory({
  noMargin: true
})).add('popular', createSandboxStory({
  sandbox: fixtures.popularSandbox()
})).add('many tags', createSandboxStory({
  sandbox: fixtures.sandboxWithManyTags()
})).add('long title', createSandboxStory({
  sandbox: fixtures.sandboxWithLongTitle()
})).add('long description', createSandboxStory({
  sandbox: fixtures.sandboxWithLongDescription()
})).add('null author', createSandboxStory({
  sandbox: fixtures.sandboxWithNullAuthor()
})).add('undefined author', createSandboxStory({
  sandbox: fixtures.sandboxWithUndefinedAuthor()
})).add('null screenshot url', createSandboxStory({
  sandbox: fixtures.sandboxWithNullScreenshotUrl()
})).add('undefined screenshot url', createSandboxStory({
  sandbox: fixtures.sandboxWithUndefinedScreenshotUrl()
}));
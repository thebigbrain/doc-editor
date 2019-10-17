"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateOptions = exports.templates = exports.sandboxWithUndefinedScreenshotUrl = exports.sandboxWithNullScreenshotUrl = exports.sandboxWithUndefinedAuthor = exports.sandboxWithNullAuthor = exports.sandboxWithLongDescription = exports.sandboxWithLongTitle = exports.sandboxWithManyTags = exports.popularSandbox = exports.sandbox = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var sandbox = function sandbox() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({
    id: '1234',
    title: 'Test Sandbox',
    description: 'A test sandbox',
    author: {
      username: 'Test User',
      avatar_url: 'https://placekitten.com/g/200/200'
    },
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    template: 'create-react-app-typescript',
    screenshot_url: 'https://placekitten.com/g/1200/300',
    view_count: 100,
    fork_count: 100,
    like_count: 100
  }, config);
};

exports.sandbox = sandbox;

var popularSandbox = function popularSandbox() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return sandbox(_objectSpread({
    view_count: 999999999,
    fork_count: 999999999,
    like_count: 999999999
  }, config));
};

exports.popularSandbox = popularSandbox;

var sandboxWithManyTags = function sandboxWithManyTags() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return sandbox({
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10', 'tag11', 'tag12', 'tag13', 'tag14', 'tag16', 'tag17', 'tag18', 'tag19', 'tag20', 'tag21', 'tag22', 'tag23', 'tag24', 'tag25', 'tag26', 'tag27', 'tag28', 'tag29', 'tag30', 'tag31', 'tag32', 'tag33', 'tag34', 'tag35', 'tag36', 'tag37', 'tag38', 'tag39', 'tag40', 'tag41', 'tag42', 'tag43', 'tag44', 'tag45', 'tag46', 'tag47', 'tag48', 'tag49']
  });
};

exports.sandboxWithManyTags = sandboxWithManyTags;

var sandboxWithLongTitle = function sandboxWithLongTitle() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return sandbox(_objectSpread({
    title: 'This is a really really really really really really really really really really really really really really long title'
  }, config));
};

exports.sandboxWithLongTitle = sandboxWithLongTitle;

var sandboxWithLongDescription = function sandboxWithLongDescription() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return sandbox(_objectSpread({
    description: 'This is a really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really long description'
  }, config));
};

exports.sandboxWithLongDescription = sandboxWithLongDescription;

var sandboxWithNullAuthor = function sandboxWithNullAuthor() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return sandbox({
    author: null
  });
};

exports.sandboxWithNullAuthor = sandboxWithNullAuthor;

var sandboxWithUndefinedAuthor = function sandboxWithUndefinedAuthor() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return sandbox({
    author: undefined
  });
};

exports.sandboxWithUndefinedAuthor = sandboxWithUndefinedAuthor;

var sandboxWithNullScreenshotUrl = function sandboxWithNullScreenshotUrl() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return sandbox({
    screenshot_url: null
  });
};

exports.sandboxWithNullScreenshotUrl = sandboxWithNullScreenshotUrl;

var sandboxWithUndefinedScreenshotUrl = function sandboxWithUndefinedScreenshotUrl() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return sandbox({
    screenshot_url: undefined
  });
};

exports.sandboxWithUndefinedScreenshotUrl = sandboxWithUndefinedScreenshotUrl;
var templates = ['adonis', 'create-react-app', 'vue-cli', 'preact-cli', 'svelte', 'create-react-app-typescript', 'angular-cli', 'parcel', 'cxjs', '@dojo/cli-create-app', 'gatsby', 'marko', 'nuxt', 'next', 'reason', 'apollo', 'sapper', 'nest', 'static', 'styleguidist', 'gridsome', 'vuepress', 'mdx-deck', 'quasar', 'unibit'];
exports.templates = templates;
var templateOptions = templates.reduce(function (acc, key) {
  return _objectSpread({}, acc, (0, _defineProperty2["default"])({}, key, key));
}, {});
exports.templateOptions = templateOptions;
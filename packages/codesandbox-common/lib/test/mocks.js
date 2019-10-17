"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.createModule = createModule;
exports.createDirectory = createDirectory;
exports.createUser = createUser;
exports.createSandbox = createSandbox;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function noop() {// No operation performed.
}

function createModule() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var params = arguments.length > 1 ? arguments[1] : undefined;
  return _objectSpread({
    title: "test-module".concat(index),
    id: "longid-module".concat(index),
    shortid: "shortid-module".concat(index),
    isNotSynced: false,
    code: "import test from 'koekje'",
    directoryShortid: null
  }, params);
}

function createDirectory() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var params = arguments.length > 1 ? arguments[1] : undefined;
  return _objectSpread({
    title: "test-dir".concat(index),
    id: "longid-dir".concat(index),
    shortid: "shortid-dir".concat(index),
    directoryShortid: null
  }, params);
}

function createUser() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var params = arguments.length > 1 ? arguments[1] : undefined;
  return _objectSpread({
    id: "test-user".concat(index),
    sandboxCount: index + 1,
    givenLikeCount: index + 1,
    avatarUrl: "https://avatar.nl/".concat(index, ".png"),
    name: "user-".concat(index),
    username: "user-username-".concat(index)
  }, params);
}

function createSandbox() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var params = arguments.length > 1 ? arguments[1] : undefined;
  var id = "sandbox-id".concat(index);
  return _objectSpread({
    title: "Test Sandbox".concat(index),
    id: id,
    author: undefined,
    currentModule: null,
    dependencyBundle: {},
    modules: [createModule()],
    directories: [createDirectory()],
    externalResources: [],
    userLiked: false,
    owned: false
  }, params);
}
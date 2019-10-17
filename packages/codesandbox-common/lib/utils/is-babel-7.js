"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBabel7 = isBabel7;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _semver = _interopRequireDefault(require("semver"));

function isCRAVersion2(dependencies, devDependencies) {
  var reactScriptsVersion = dependencies['react-scripts'] || devDependencies['react-scripts'];

  if (reactScriptsVersion) {
    return /^[a-z]/.test(reactScriptsVersion) || _semver["default"].intersects(reactScriptsVersion, '^2.0.0') || _semver["default"].intersects(reactScriptsVersion, '^3.0.0');
  }

  return false;
}

function isBabel7() {
  var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var devDependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (devDependencies['@vue/cli-plugin-babel']) {
    return true;
  }

  if (devDependencies['@babel/core'] || dependencies['@babel/core']) {
    return true;
  }

  if (dependencies.svelte || devDependencies.svelte) {
    var ver = dependencies.svelte || devDependencies.svelte;

    var _ver$split = ver.split('.'),
        _ver$split2 = (0, _slicedToArray2["default"])(_ver$split, 1),
        maj = _ver$split2[0];

    if (maj) {
      return +maj > 2;
    }

    return false;
  }

  if ('typescript' in devDependencies && !dependencies['@angular/core']) {
    return true;
  }

  if (isCRAVersion2(dependencies, devDependencies)) {
    return true;
  }

  return false;
}
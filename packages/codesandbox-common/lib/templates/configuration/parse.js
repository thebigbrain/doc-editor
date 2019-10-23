"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseConfigurations;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _marktyToml = _interopRequireDefault(require("markty-toml"));

var _jsonlint = require("../../forked-vendors/jsonlint.browser");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getCode(template, module, sandbox, resolveModule, configurationFile) {
  if (module) {
    return {
      code: module.code,
      generated: false
    };
  }

  if (configurationFile.getDefaultCode) {
    return {
      code: configurationFile.getDefaultCode(template, resolveModule),
      generated: true
    };
  }

  if (sandbox && configurationFile.generateFileFromSandbox) {
    return {
      code: configurationFile.generateFileFromSandbox(sandbox),
      generated: true
    };
  }

  return {
    code: '',
    generated: false
  };
}

function titleIncludes(module, test) {
  if ('title' in module) {
    return module.title.includes(test);
  }

  if ('path' in module) {
    return module.path.includes(test);
  }

  return false;
}
/**
 * We convert all configuration file configs to an object with configuration per
 * type. This makes configs universal.
 */


function parseConfigurations(template, configurationFiles, resolveModule, sandbox) {
  var configurations = {};
  var paths = Object.keys(configurationFiles);

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    var module = resolveModule(path);
    var configurationFile = configurationFiles[path];

    var baseObject = _objectSpread({
      path: path
    }, getCode(template, module, sandbox, resolveModule, configurationFile));

    var code = baseObject.code;

    if (code) {
      try {
        var parsed = void 0; // it goes here three times and the third time it doesn't have a title but a path
        // that took a while ffs
        // if toml do it with toml parser

        if (module && titleIncludes(module, 'toml')) {
          // never throws
          parsed = (0, _marktyToml["default"])(code);
        } else {
          parsed = (0, _jsonlint.parse)(code);
        }

        configurations[configurationFile.type] = _objectSpread({}, baseObject, {
          parsed: parsed
        });
      } catch (e) {
        configurations[configurationFile.type] = _objectSpread({}, baseObject, {
          error: e
        });
      }
    }
  }

  return configurations;
}
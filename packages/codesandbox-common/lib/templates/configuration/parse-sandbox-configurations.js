"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSandboxConfigurations = parseSandboxConfigurations;

var _ = _interopRequireDefault(require(".."));

var _parse = _interopRequireDefault(require("./parse"));

var _resolveModuleWrapped = require("./resolve-module-wrapped");

function parseSandboxConfigurations(sandbox) {
  var templateDefinition = (0, _["default"])(sandbox.template);
  return (0, _parse["default"])(sandbox.template, templateDefinition.configurationFiles, (0, _resolveModuleWrapped.resolveModuleWrapped)(sandbox), sandbox);
}
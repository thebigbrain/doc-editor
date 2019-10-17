"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var config = {
  title: '.eslintrc',
  type: 'eslint',
  description: 'Configuration for the linter.',
  moreInfoUrl: 'https://eslint.org/docs/user-guide/configuring',
  getDefaultCode: function getDefaultCode() {
    return '{}';
  },
  schema: 'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/eslintrc.json',
  partialSupportDisclaimer: "We can only read preinstalled rules (all from eslint, react, prettier, import and vue plugins)."
};
var _default = config;
exports["default"] = _default;
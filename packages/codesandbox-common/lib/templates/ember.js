"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("./template"));

var _theme = require("../theme");

var _default = new _template["default"]('ember', 'Ember', 'https://emberjs.com/',
/**
 * Ideally, we'd point to https://github.com/ember-cli/ember-new-output
 * but there are a few tweaks that must be addressed before then.
 *  - Auto-detection of ember-cli projects as node projects,
 *    without requiring a sandbox.config.json
 *    PR: https://github.com/codesandbox-app/codesandbox-importers/pull/16
 *  - Ember-CLI initial build chokes on empty app/styles/app.css file
 *  - A small livereload fix, for proper port detection through the CSB proxy stuff
 *    BUG: https://github.com/ember-cli/ember-cli/issues/8073
 *
 * Here is a complete diff of these changes, w.r.t. the code generated by
 * `ember new my-app`
 *
 * https://github.com/ember-cli/ember-new-output/compare/master...mike-north:master
 */
'github/mike-north/ember-new-output', (0, _theme.decorateSelector)(function () {
  return '#E04E39';
}), {
  isServer: true,
  showOnHomePage: true,
  main: false,
  netlify: false
});

exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _host = _interopRequireDefault(require("../utils/host"));

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
var REACT_APP = /^REACT_APP_/i;
var NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');
var LOCAL_SERVER = Boolean(JSON.stringify(process.env.LOCAL_SERVER));

var _default = Object.keys(process.env).filter(function (key) {
  return REACT_APP.test(key);
}).reduce(function (env, key) {
  env['process.env.' + key] = JSON.stringify(process.env[key]);
  return env;
}, {
  'process.env.NODE_ENV': NODE_ENV,
  'process.env.CODESANDBOX_HOST': JSON.stringify((0, _host["default"])()),
  'process.env.LOCAL_SERVER': Boolean(LOCAL_SERVER),
  'process.env.STAGING': 'STAGING_BRANCH' in process.env,
  'process.env.VSCODE': Boolean(JSON.stringify(process.env.VSCODE))
});

exports["default"] = _default;
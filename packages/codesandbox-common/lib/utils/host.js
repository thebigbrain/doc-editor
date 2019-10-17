"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var IS_LOCAL_SERVER = Boolean(JSON.stringify(process.env.LOCAL_SERVER));

var _default = function _default() {
  if (IS_LOCAL_SERVER) {
    return 'http://localhost:3000';
  }

  if (process.env.NODE_ENV === 'development') {
    return 'https://codesandbox.test';
  }

  if ('STAGING_BRANCH' in process.env) {
    return "https://".concat(process.env.STAGING_BRANCH, ".build.csb.dev");
  }

  if ('ROOT_URL' in process.env) {
    return process.env.ROOT_URL;
  }

  return 'https://codesandbox.io';
};

exports["default"] = _default;
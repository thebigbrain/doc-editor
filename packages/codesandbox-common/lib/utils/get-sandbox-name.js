"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSandboxName = void 0;

var getSandboxName = function getSandboxName(sandbox) {
  return sandbox.title || sandbox.alias || sandbox.id;
};

exports.getSandboxName = getSandboxName;
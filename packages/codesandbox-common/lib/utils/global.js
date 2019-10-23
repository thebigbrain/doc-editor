"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlobal = getGlobal;
exports.commonPostMessage = commonPostMessage;

var _urlGenerator = require("./url-generator");

function getGlobal() {
  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof self !== 'undefined') {
    var returnedGlobal = self;
    return returnedGlobal;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  return {};
}

var global = getGlobal();
/**
 * A postmessage that works in main window and in worker.
 * It will send the message to the default origin.
 * @param message The message to send
 */

function commonPostMessage(message) {
  if (typeof Window !== 'undefined') {
    global.postMessage(message, (0, _urlGenerator.protocolAndHost)());
  } else {
    global.postMessage(message);
  }
}
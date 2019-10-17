"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addListener;
var isOnline = navigator.onLine;
var listeners = {};

function updateOnlineStatus(event) {
  isOnline = navigator.onLine;
  Object.keys(listeners).forEach(function (listener) {
    listeners[listener](isOnline);
  });
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
var id = 0;

function addListener(listener) {
  var listenerId = id;
  listeners[id++] = listener; // Already let listener know what the status is

  listener(isOnline);
  return function () {
    listeners[listenerId] = null;
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ThemeDecorator = require("./ThemeDecorator");

Object.keys(_ThemeDecorator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ThemeDecorator[key];
    }
  });
});
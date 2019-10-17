"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getUI;

var _ = _interopRequireDefault(require("."));

var _ui = _interopRequireDefault(require("./prettierRC/ui"));

var _ui2 = _interopRequireDefault(require("./sandbox/ui"));

function getUI(configType) {
  switch (configType) {
    case _["default"].prettierRC.type:
      {
        return _ui["default"];
      }

    case _["default"].sandboxConfig.type:
      {
        return _ui2["default"];
      }

    default:
      {
        return null;
      }
  }
}
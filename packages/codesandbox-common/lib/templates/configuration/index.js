"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _packageJson = _interopRequireDefault(require("./package-json"));

var _prettierRC = _interopRequireDefault(require("./prettierRC"));

var _sandbox = _interopRequireDefault(require("./sandbox"));

var _babelrc = _interopRequireDefault(require("./babelrc"));

var _now = _interopRequireDefault(require("./now"));

var _netlify = _interopRequireDefault(require("./netlify"));

var _angularCli = _interopRequireDefault(require("./angular-cli"));

var _angularJson = _interopRequireDefault(require("./angular-json"));

var _tsconfig = _interopRequireDefault(require("./tsconfig"));

var _jsconfig = _interopRequireDefault(require("./jsconfig"));

var _babelTranspiler = _interopRequireDefault(require("./babel-transpiler"));

var _customCodesandbox = _interopRequireDefault(require("./custom-codesandbox"));

var configs = {
  babelrc: _babelrc["default"],
  babelTranspiler: _babelTranspiler["default"],
  packageJSON: _packageJson["default"],
  prettierRC: _prettierRC["default"],
  sandboxConfig: _sandbox["default"],
  angularCli: _angularCli["default"],
  angularJSON: _angularJson["default"],
  tsconfig: _tsconfig["default"],
  customCodeSandbox: _customCodesandbox["default"],
  nowConfig: _now["default"],
  netlifyConfig: _netlify["default"],
  jsconfig: _jsconfig["default"]
};
var _default = configs;
exports["default"] = _default;
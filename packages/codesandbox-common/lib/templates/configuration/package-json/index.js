"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateFileFromSandbox = generateFileFromSandbox;
exports["default"] = void 0;

var _slugify = _interopRequireDefault(require("../../../utils/slugify"));

function generateFileFromSandbox(sandbox) {
  var jsonFile = {
    name: (0, _slugify["default"])(sandbox.title || sandbox.id),
    version: '1.0.0',
    description: sandbox.description || '',
    keywords: sandbox.tags,
    main: sandbox.entry,
    dependencies: sandbox.npmDependencies
  };
  return JSON.stringify(jsonFile, null, 2);
}

var config = {
  title: 'package.json',
  type: 'package',
  description: 'Describes the overall configuration of your project.',
  moreInfoUrl: 'https://docs.npmjs.com/files/package.json',
  generateFileFromSandbox: generateFileFromSandbox,
  schema: 'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/package.json'
};
var _default = config;
exports["default"] = _default;
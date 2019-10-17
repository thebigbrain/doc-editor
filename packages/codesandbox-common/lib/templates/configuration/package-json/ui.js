"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ConfigWizard = void 0;

var _react = _interopRequireDefault(require("react"));

var _elements = require("../elements");

var ConfigWizard = function ConfigWizard(_ref) {
  var file = _ref.file;
  var error;

  try {
    JSON.parse(file);
  } catch (e) {
    error = e;
  }

  if (error) {
    return _react["default"].createElement("div", null, "Problem parsing file: ", error.message);
  }

  return _react["default"].createElement("div", null, _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.ConfigName, null, "name"), _react["default"].createElement(_elements.ConfigValue, null, "World"))), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.ConfigName, null, "version"), _react["default"].createElement(_elements.ConfigValue, null, "World")), _react["default"].createElement(_elements.ConfigDescription, null, "The version of the project, this is required together with the name. For non-libraries this is 1.0.0 most of the time.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.ConfigName, null, "description"), _react["default"].createElement(_elements.ConfigValue, null, "World"))), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.ConfigName, null, "keywords"), _react["default"].createElement(_elements.ConfigValue, null, "World")), _react["default"].createElement(_elements.ConfigDescription, null, "Used to make the project more easily searchable. This helps people discover your package as it", "'", "s listed in npm search.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.ConfigName, null, "homepage"), _react["default"].createElement(_elements.ConfigValue, null, "World")), _react["default"].createElement(_elements.ConfigDescription, null, "The url to the project homepage.")), _react["default"].createElement(_elements.PaddedConfig, null, _react["default"].createElement(_elements.ConfigItem, null, _react["default"].createElement(_elements.ConfigName, null, "license"), _react["default"].createElement(_elements.ConfigValue, null, "World")), _react["default"].createElement(_elements.ConfigDescription, null, "The license describes guidelines on the use and distribution of your project.", ' ', _react["default"].createElement("a", {
    href: "https://choosealicense.com/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Choose a license"), ' ', "is a helpful resource for choosing a license.")));
};

exports.ConfigWizard = ConfigWizard;
var _default = {
  ConfigWizard: ConfigWizard
};
exports["default"] = _default;
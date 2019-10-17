"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPreviewTabs = void 0;

var _ = _interopRequireDefault(require(".."));

var _modules = require("../../sandbox/modules");

var getPreviewTabs = function getPreviewTabs(sandbox, configurations) {
  var intermediatePreviewCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var template = (0, _["default"])(sandbox.template);
  var views = template.getViews(configurations);

  try {
    var workspaceConfig = intermediatePreviewCode ? {
      code: intermediatePreviewCode
    } : (0, _modules.resolveModule)('/.codesandbox/workspace.json', sandbox.modules, sandbox.directories);

    var _JSON$parse = JSON.parse(workspaceConfig.code),
        preview = _JSON$parse.preview;

    if (preview && Array.isArray(preview)) {
      views = preview;
    }
  } catch (e) {
    /* Ignore */
  }

  return views;
};

exports.getPreviewTabs = getPreviewTabs;
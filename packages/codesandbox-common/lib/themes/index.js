"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _codesandbox = _interopRequireDefault(require("./codesandbox.json"));

var _systemImportTransformerGlobalIdentifier = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};

var _default = [{
  name: 'CodeSandbox',
  id: 'codesandbox',
  content: _codesandbox["default"]
}, {
  name: 'Night Owl',
  id: 'nightOwl',
  url: 'https://cdn.jsdelivr.net/gh/sdras/night-owl-vscode-theme@ff58e0d3967ef968492ce8c9809239f0511b9b70/themes/Night%20Owl-color-theme.json'
}, {
  name: 'Night Owl (No Italics)',
  id: 'nightOwlNoItalics',
  url: 'https://cdn.jsdelivr.net/gh/sdras/night-owl-vscode-theme@ff58e0d3967ef968492ce8c9809239f0511b9b70/themes/Night%20Owl-color-theme-noitalic.json'
}, {
  name: 'Atom Dark',
  id: 'atomDark',
  type: 'dark',
  url: 'https://cdn.jsdelivr.net/gh/akamud/vscode-theme-onedark@11ef483921495ea6c086f56149dfa0ca6225ae53/themes/OneDark.json'
}, {
  name: 'Cobalt 2',
  id: 'cobalt2',
  url: 'https://cdn.jsdelivr.net/gh/wesbos/cobalt2-vscode/theme/cobalt2.json'
}, {
  name: 'Palenight',
  id: 'palenight',
  url: 'https://cdn.jsdelivr.net/gh/whizkydee/vscode-material-palenight-theme/themes/palenight.json'
}, {
  name: 'Palenight Italic',
  id: 'palenightItalic',
  url: 'https://cdn.jsdelivr.net/gh/whizkydee/vscode-material-palenight-theme/themes/palenight-italic.json'
}, {
  name: 'Shades of Purple',
  id: 'shadesOfPurple',
  url: 'https://cdn.jsdelivr.net/gh/ahmadawais/shades-of-purple-vscode@983101b2e9f57638fbc1bd5c551f5c84e561756e/themes/shades-of-purple-color-theme.json'
}, {
  name: 'Lucy',
  id: 'lucy',
  url: 'https://cdn.jsdelivr.net/gh/juliettepretot/lucy-vscode@f27d836399d906bc7f7af5fd3950126240be969c/dist/color-theme.json'
}, {
  name: 'High Contrast',
  id: 'highContrast',
  get: function get() {
    return typeof _systemImportTransformerGlobalIdentifier.define === "function" && _systemImportTransformerGlobalIdentifier.define.amd ? new Promise(function (resolve, reject) {
      _systemImportTransformerGlobalIdentifier.require(["./high-contrast.json"], resolve, reject);
    }) : typeof module !== "undefined" && module.exports && typeof require !== "undefined" || typeof module !== "undefined" && module.component && _systemImportTransformerGlobalIdentifier.require && _systemImportTransformerGlobalIdentifier.require.loader === "component" ? Promise.resolve(require(('./high-contrast.json'))) : Promise.resolve(_systemImportTransformerGlobalIdentifier["./high-contrast.json"]);
  }
}, {
  name: 'VSCode Light',
  id: 'vscodeLight',
  get: function get() {
    return typeof _systemImportTransformerGlobalIdentifier.define === "function" && _systemImportTransformerGlobalIdentifier.define.amd ? new Promise(function (resolve, reject) {
      _systemImportTransformerGlobalIdentifier.require(["./vscode-light"], resolve, reject);
    }) : typeof module !== "undefined" && module.exports && typeof require !== "undefined" || typeof module !== "undefined" && module.component && _systemImportTransformerGlobalIdentifier.require && _systemImportTransformerGlobalIdentifier.require.loader === "component" ? Promise.resolve(require(('./vscode-light'))) : Promise.resolve(_systemImportTransformerGlobalIdentifier["./vscode-light"]);
  }
}, {
  name: 'Atom Light',
  id: 'atomLight',
  url: 'https://cdn.jsdelivr.net/gh/akamud/vscode-theme-onelight/themes/OneLight.json'
}, {
  name: 'Solarized Light',
  id: 'solarizedLight',
  url: 'https://cdn.jsdelivr.net/gh/Microsoft/vscode@d2b6bbb46fbdf535e2c96b3e00ac56ac1d427a69/extensions/theme-solarized-light/themes/solarized-light-color-theme.json'
}];
exports["default"] = _default;
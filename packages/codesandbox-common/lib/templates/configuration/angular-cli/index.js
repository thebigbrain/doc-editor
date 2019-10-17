"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var config = {
  title: '.angular-cli.json',
  type: 'angular-cli',
  description: 'The configuration used for angular-cli, the cli to run angular projects.',
  moreInfoUrl: 'https://github.com/angular/angular-cli/wiki/angular-cli',
  getDefaultCode: function getDefaultCode() {
    return JSON.stringify({
      apps: [{
        root: 'src',
        outDir: 'dist',
        index: 'index.html',
        main: 'main.ts',
        polyfills: 'polyfills.ts',
        styles: [],
        scripts: []
      }]
    }, null, 2);
  },
  schema: 'https://raw.githubusercontent.com/angular/angular-cli/master/packages/@angular/cli/lib/config/schema.json'
};
var _default = config;
exports["default"] = _default;
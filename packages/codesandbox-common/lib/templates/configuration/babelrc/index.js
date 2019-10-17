"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isBabel = require("../../../utils/is-babel-7");

var JSX_PRAGMA = {
  react: 'React.createElement',
  preact: 'h'
};
var config = {
  title: '.babelrc',
  type: 'babel',
  description: 'Custom configuration for Babel, the transpiler we use.',
  moreInfoUrl: 'https://babeljs.io/docs/usage/babelrc/',
  getDefaultCode: function getDefaultCode(template, resolveModule) {
    var isV7 = false;

    try {
      var packageJSON = resolveModule('/package.json');
      var parsed = JSON.parse(packageJSON.code || '');
      isV7 = (0, _isBabel.isBabel7)(parsed.dependencies, parsed.devDependencies);
    } catch (e) {
      console.error(e);
    }

    if (template === 'preact-cli') {
      return JSON.stringify({
        presets: ['latest', 'stage-1'],
        plugins: ['transform-object-assign', 'transform-decorators-legacy', ['transform-react-jsx', {
          pragma: 'h'
        }], ['jsx-pragmatic', {
          module: 'preact',
          "export": 'h',
          "import": 'h'
        }]]
      }, null, 2);
    }

    if (template === 'vue-cli') {
      // TODO remove this

      /**
       * This hacky fix got added for vue cli templates that are v3, but don't have a config.
       *
       * We correctly detect v3 templates, so start using babel 7, but they don't work with the old version of babel config. We need to create a new one.
       *
       * Need to fix this ASAP and make vue-cli 3 a separate template.
       */
      if (isV7) {
        return JSON.stringify({
          presets: ['@vue/app']
        });
      }

      return JSON.stringify({
        presets: [['env', {
          modules: false,
          targets: {
            browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
          }
        }], 'stage-2'],
        plugins: ['transform-vue-jsx', 'transform-runtime'],
        env: {
          test: {
            presets: ['env', 'stage-2'],
            plugins: ['transform-vue-jsx', 'transform-es2015-modules-commonjs', 'dynamic-import-node']
          }
        }
      }, null, 2);
    }

    if (template === 'parcel') {
      var presets = ['env'];
      var plugins = isV7 ? ['transform-runtime'] : [['transform-runtime', {
        polyfill: false,
        regenerator: true
      }], 'transform-object-rest-spread'];
      var parserOpts = isV7 ? {
        plugins: ['dynamicImport']
      } : {};
      var packageJSONModule = resolveModule('/package.json');

      if (packageJSONModule) {
        try {
          var _parsed = JSON.parse(packageJSONModule.code);

          var pragma = null;
          Object.keys(JSX_PRAGMA).forEach(function (dep) {
            if (_parsed.dependencies && _parsed.dependencies[dep] || _parsed.devDependencies && _parsed.devDependencies[dep]) {
              pragma = JSX_PRAGMA[dep];
            }
          });

          if (pragma !== null) {
            // @ts-ignore
            plugins.push(['transform-react-jsx', {
              pragma: pragma
            }]);
          }
        } catch (e) {
          /* do nothing */
        }
      }

      return JSON.stringify({
        presets: presets,
        plugins: plugins,
        parserOpts: parserOpts
      }, null, 2);
    }

    if (template === 'cxjs') {
      if (isV7) {
        return JSON.stringify({
          presets: ['env'],
          plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-function-bind', 'transform-cx-jsx', '@babel/plugin-transform-parameters', '@babel/plugin-syntax-dynamic-import', ['@babel/plugin-transform-react-jsx', {
            pragma: 'VDOM.createElement'
          }]]
        }, null, 2);
      }

      return JSON.stringify({
        presets: [['env', {
          targets: {
            chrome: 50,
            ie: 11,
            ff: 30,
            edge: 12,
            safari: 9
          },
          modules: false,
          loose: true,
          useBuiltIns: true
        }], 'stage-2'],
        plugins: [['transform-cx-jsx'], ['transform-react-jsx', {
          pragma: 'VDOM.createElement'
        }], 'transform-function-bind', 'transform-runtime', 'transform-regenerator']
      }, null, 2);
    }

    return JSON.stringify({
      presets: [],
      plugins: []
    }, null, 2);
  },
  schema: 'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/babelrc.json'
};
var _default = config;
exports["default"] = _default;
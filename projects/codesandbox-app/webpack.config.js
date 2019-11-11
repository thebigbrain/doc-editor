const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const builtin = require('module').builtinModules;

exports.merge = require('merge-deep');

const baseConfig = {
  mode: process.env.mode || 'development',
  devServer: {
    hot: true,
  },
  externals: {
    'BrowserFS': 'BrowserFS',
    'fs': 'BrowserFS.BFSRequire("fs")',
    'path': 'BrowserFS.BFSRequire("path")',
    'buffer': 'BrowserFS.BFSRequire("buffer")',
  },
  resolve: {
    symlinks: false,
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    alias: {
      // ... and any other directories you might have
      '~': path.resolve(__dirname, '.'),
      // 'fs': 'browserfs/dist/shims/fs.js',
      // 'buffer': 'browserfs/dist/shims/buffer.js',
      // 'path': 'browserfs/dist/shims/path.js',
      // 'processGlobal': 'browserfs/dist/shims/process.js',
      // 'bufferGlobal': 'browserfs/dist/shims/bufferGlobal.js',
      // 'bfsGlobal': require.resolve('browserfs')
    },
  },
  // REQUIRED to avoid issue "Uncaught TypeError: BrowserFS.BFSRequire is not a function"
  // See: https://github.com/jvilk/BrowserFS/issues/201
  module: {
    noParse: /browserfs\.js/
  },
};

const clientConfig = {
  entry: './index.js',
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  'absoluteRuntime': false,
                  'corejs': 3,
                  'helpers': true,
                  'regenerator': true,
                  'useESModules': false,
                },
              ],
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-export-namespace-from',
              'babel-plugin-styled-components',
            ],
          },
        },
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          // {
          //   loader: "less-loader",
          //   options: {
          //     javascriptEnabled: true
          //   }
          // }
          // 'postcss-loader'
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-react-loader',
          options: {
            name: 'Icon',
          },
        },
        // loader: 'svg-inline-loader?classPrefix',
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(zip|gz)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.worker\.js$/i,
        use: [
          {
            loader: 'worker-loader',
            options: { publicPath: '/' }
          }
        ]
      },
    ],
  },
  // REQUIRED to avoid issue "Uncaught TypeError: BrowserFS.BFSRequire is not a function"
  // See: https://github.com/jvilk/BrowserFS/issues/201
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.ProvidePlugin({ BrowserFS: 'bfsGlobal' }),
  ],
  node: {
    process: false,
    Buffer: false
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    proxy: {
      '/oauth': 'http://localhost:3030',
    },
  },
  devtool: 'eval-source-map',
};

module.exports = exports.merge(baseConfig, clientConfig);

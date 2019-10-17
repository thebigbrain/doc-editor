const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.merge = require('merge-deep')

const baseConfig = {
  mode: process.env.mode || 'development',
  devServer: {
    hot: true,
  },
  externals: [],
  resolve: {
    symlinks: false,
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    alias: {
      // ... and any other directories you might have
      '~': path.resolve(__dirname, '.')
    },
  },
}

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
              "babel-plugin-styled-components",
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
        }
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    proxy: {
      '/oauth': 'http://localhost:3030'
    }
  },
  devtool: 'eval-source-map'
}

module.exports = exports.merge(baseConfig, clientConfig)

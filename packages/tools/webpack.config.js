const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.merge = require('merge-deep')

console.log(path.resolve(__dirname, '.'), path.resolve('.'))

const baseConfig = {
  mode: process.env.mode || 'development',
  devServer: {
    hot: true,
  },
  externals: [],
  resolve: {
    modules: [
      path.resolve('node_modules'),
      path.resolve('.')
    ],
    alias: {
      // ... and any other directories you might have
      '~': path.resolve('')
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
        loader: 'svg-inline-loader?classPrefix',
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
    modules: [path.resolve('.'),]
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    proxy: {
      '/mongo': 'http://localhost:3080'
    }
  },
  devtool: 'eval-source-map'
}

exports.commonConfig = exports.merge(baseConfig, clientConfig)

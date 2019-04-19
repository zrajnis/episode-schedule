require('dotenv-safe').load()

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const commonConfig = require('./webpack.common.config')

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, 'src/index.tsx')
  ],
  mode: 'development',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[local]',
            modules: true
          }
        },
        'postcss-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: './src/styles/main.scss'
          }
        }
      ]
    }]
  },
  output: {
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}

module.exports = merge(commonConfig, config)

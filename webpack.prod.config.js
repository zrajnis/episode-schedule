require('dotenv-safe').load()

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')

const commonConfig = require('./webpack.common.config')

const config = {
  entry: [
    path.join(__dirname, 'src/index.tsx')
  ],
  mode: 'production',
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[local]',
            minimize: true,
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
  optimization: {
    minimizer: [
      new TerserPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      maxSize: 240000
    }
  },
  output: {
    filename: '[name]-[hash].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    })
  ]
}

module.exports = merge(commonConfig, config)

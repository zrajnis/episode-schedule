require('dotenv-safe').load()

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [ '@babel/polyfill' ],
  module: {
    rules: [{
      exclude: [ /node_modules/ ],
      test: /\.(ts|js)x?$/,
      use: [ 'babel-loader' ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: 'assets/[name].[ext]'
        }
      }]
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.tpl.html'
    })
  ],
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx'
    ],
    modules: [
      'node_modules',
      path.join(__dirname, 'src')
    ]
  }
}

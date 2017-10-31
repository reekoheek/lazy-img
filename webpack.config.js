const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {
  return {
    context: path.join(__dirname, 'example'),
    entry: {
      index: './index.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
    },
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ],
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: getBabelLoader(),
        },
      ],
    },
  };
};

function getBabelLoader () {
  return {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      plugins: [
        // require.resolve('babel-plugin-istanbul'),
        // require.resolve('babel-plugin-__coverage__'),
        // [ require.resolve('babel-plugin-__coverage__'), { 'ignore': 'node_modules' } ],
        // 'babel-plugin-syntax-dynamic-import',
        // 'babel-plugin-transform-async-to-generator',
      ],
      presets: [
      //   'babel-preset-es2015',
      //   'babel-preset-stage-3',
      ],
      cacheDirectory: true,
    },
  };
}

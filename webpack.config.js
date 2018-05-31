const path = require('path');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const srcPath     = __dirname;
const outputPath  = path.resolve(__dirname, 'dist');

module.exports = (env) => {
  const cssLoaders = [
    MiniCssExtractPlugin.loader,
    'css-loader'
  ];

  if (env && env.NO_EXTRACT === 'true') {
    cssLoaders.splice(0, 1);
  }
  console.log(cssLoaders);

  return {
    mode: 'development',

    devServer: {
      contentBase: false
    },

    entry: path.resolve(srcPath, 'index.js'),

    output: {
      path: outputPath
    },

    module: {
      rules: [
        {
          test:     /\.css$/,
          include:  srcPath,
          use:      cssLoaders
        },
        {
          test: /\.jpg$/,
          use: 'file-loader'
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin(outputPath),
      new HardSourceWebpackPlugin({
        environmentHash: {
          root: process.cwd(),
          directories: [],
          files: ['yarn.lock']
        }
      }),
      new MiniCssExtractPlugin({ filename: '[name].css' }),
    ]
  };
};

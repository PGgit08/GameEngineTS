const path = require('path');
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  resolve: {
    plugins: [new TsConfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: "source-map",
  mode: "development",
  entry: './build-babel/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
      new CheckerPlugin()
  ]
};
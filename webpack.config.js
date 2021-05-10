const path = require('path');

module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: './build-babel/Game/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const { NODE_ENV = 'production' } = process.env;

const config = {
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  mode: NODE_ENV,
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

const devConfig = {
  ...config,
  watchOptions: {
    ignored: ['**/dist', '**/node_modules'],
  },
  externals: [nodeExternals()],
};

module.exports = NODE_ENV === 'production'? config : devConfig;
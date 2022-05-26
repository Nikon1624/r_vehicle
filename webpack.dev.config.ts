const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://frontend-study.simbirsoft/',
        changeOrigin: true,
      },
    },
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.module\.(sass|scss|css)$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]_[sha1:hash:hex:7]',
            },
          },
        }, 'postcss-loader', 'sass-loader'],
      },
      {
        test: /^((?!\.module).)*(sass|scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(jpe?g|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};

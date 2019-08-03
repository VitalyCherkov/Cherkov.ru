const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = subPath => path.join(__dirname, '../src', subPath);
const publicDir = path.join(__dirname, '..', '/public');

const getCSSLoader = (withModules = false, isProd = false) => [
  !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: withModules && {
        localIdentName: '[local]___[hash:base64:5]'
      },
      importLoaders: 1,
      sourceMap: false
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [autoprefixer()]
    }
  },
  {
    loader: 'sass-loader',
    options: {
      includePaths: [srcPath]
    }
  }
];

module.exports = isProd => ({
  entry: './src/index.tsx',
  output: {
    path: publicDir,
    publicPath: '/',
    filename: 'static/js/[name].[hash].js',
  },
  resolve: {
    extensions:  ['.js', '.ts', '.tsx', '.scss', '.css', '.html', '.json'],
    alias: {
      components: srcPath('components'),
      config: srcPath('config'),
      img: srcPath('img'),
      pages: srcPath('pages'),
      store: srcPath('store'),
      styles: srcPath('styles'),
      utils: srcPath('utils'),
      libs: srcPath('libs'),
    }
  },
  module: {
    rules: [
      {
        test: /.(s?css|sass)$/,
        exclude: /\.modules\.(s?css|sass)$/,
        use: getCSSLoader(false, isProd),
      },
      {
        test: /\.modules\.(s?css|sass)$/,
        use: getCSSLoader(true, isProd)
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              configFile: 'tslint.json'
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ]
      },
      {
        test: [/\.woff2$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
});

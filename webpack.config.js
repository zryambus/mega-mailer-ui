const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputPath = path.resolve(__dirname, './build');

const extractStyleLoaders = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: {
        exportLocalsConvention: 'camelCaseOnly',
        localIdentName: '[local]'
      },
      import: false,
      url: false
    }
  },
  'sass-loader'
];

module.exports = [
  {
    entry: './src/app.tsx',

    stats: {
      children: true
    },

    output: {
      path: outputPath,
      publicPath: '/',
      filename: '[name].js',
    },

    devtool: 'source-map',

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      modules: [
        path.resolve('./src'),
        'node_modules'
      ],
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                esModule: false
              }
            },
            {
              loader: 'dts-css-modules-loader',
              options: {
                namedExport: true,
                banner: '// This file is generated automatically.'
              }
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  exportLocalsConvention: 'camelCaseOnly',
                  localIdentName: '[local]'
                },
                import: false,
                url: false
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          use: 'url-loader?limit=100000&name=svg/[name].[ext]'
        },
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.json',
                transpileOnly: true
              }
            }
          ]
        },
      ]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '/styles/style.css'
      }),
    ]
  },
  {
    entry: './src/app.scss',
    output: {
      path: outputPath
    },
    resolve: {
      extensions: ['.scss', '.css'],
      modules: [
        path.resolve('./src/'),
        'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: extractStyleLoaders
        },

      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      })
    ]
  }
];

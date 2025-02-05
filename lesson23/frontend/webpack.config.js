import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

import webpackPkg from "webpack";
import dotenv from "dotenv";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const { DefinePlugin } = webpackPkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env, argv) => {
  const envVars = dotenv.config().parsed || {};
  const envKeys = Object.keys(envVars).reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(envVars[key]);
    return acc;
  }, {});
  const mode = process.env.MODE || argv.mode || "development";
  const isProd = mode === "production";

  return {
    mode,
    entry: resolve(__dirname, "src/app.js"),
    devtool: !isProd ? "cheap-module-source-map" : false,
    output: {
      path: resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: { compress: { drop_console: true } },
        }),
        new CssMinimizerPlugin(),
      ],
    },
    devServer: {
      devMiddleware: {
        writeToDisk: false,
      },
      static: {
        directory: join(__dirname, "dist"),
      },
      port: 7000,
      open: true,
      hot: true,
      compress: true,
    },
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
        {
          test: /\.s[ac]ss$/,
          exclude: /node_modules/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: { sourceMap: !isProd },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: !isProd,
                sassOptions: {
                  outputStyle: isProd ? "compressed" : "expanded",
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset",
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "Todos",
        minify: isProd
          ? {
              removeAttributeQuotes: true,
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
        template: resolve(__dirname, "src/pages/index.html"),
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: isProd ? "[name].[contenthash].css" : "[name].css",
        }),
      new DefinePlugin(envKeys),
    ],
  };
};

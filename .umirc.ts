/*
 * @Author: shiyuan
 * @Date: 2024-07-12 13:18:02
 * @LastEditors: shiyuan
 * @LastEditTime: 2024-07-26 09:36:21
 * @Description: 
 */
import { defineConfig } from "umi";
import theme from './config/theme.config';
import px2viewport from 'postcss-px-to-viewport';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

export default defineConfig({
  routes: [
    { path: "/", component: '@/pages/Home' },
    { path: "/code", component: '@/pages/VerifyCode' },
    { path: "/scroll", component: '@/pages/InfiniteScroll' },
  ],
  npmClient: 'yarn',
  extraPostCSSPlugins: [px2viewport({ viewportWidth: 375 })],
  theme: theme(),
  chainWebpack(config) {
    config.merge({
      optimization: {
        minimize: true,
        minimizer: [
          {
            plugin: CssMinimizerPlugin,
          },
        ],
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 10,
          automaticNameDelimiter: '.',
          cacheGroups: {
            default: false,
          },
        },
      },
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
      },
      plugins: [
        new CompressionPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
      ],
    });
    return config;
  },
});

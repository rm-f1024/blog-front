/**
 * @type {import('next').NextConfig}
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = {
  assetPrefix:'/',
  distDir: 'build',
  images: {
    loader: 'akamai',
    path: '/',
  },
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     '/': { page: '/' },
     
  //   }
  // },
  

}
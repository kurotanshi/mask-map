
const baseUrl = process.env.NODE_ENV === 'production' ? './' : '/'

module.exports = {
  // filenameHashing: false,
  devServer: { https: true },
  productionSourceMap: false,
  publicPath: baseUrl
}

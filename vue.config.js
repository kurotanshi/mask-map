
const baseUrl = process.env.NODE_ENV === 'production' ? './' : '/'

module.exports = {
  filenameHashing: false,
  productionSourceMap: false,
  publicPath: baseUrl
}

module.exports = {
  devServer: {
    proxy: {
      // 配置跨域处理 可以设置多个
      '/api': {
        target: 'http://localhost:9999/elm',
        changeOrigin: true,
        ws: false,
        secure: false, // 如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}

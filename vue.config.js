/*
 * @Descripttion:
 * @Author: congz
 * @Date: 2020-09-24 17:15:19
 * @LastEditors: congz
 * @LastEditTime: 2020-10-12 12:26:06
 */
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: true,
        port: 8081,
        proxy: {
            '^/api': {
                target: 'http://localhost:4000',
                ws: true,
                changeOrigin: true
            }
        }
    }
};

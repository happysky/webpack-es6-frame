var path = require('path');
var webpackMerge = require('webpack-merge')
var webpackCommon = require('./webpack.common')

module.exports = webpackMerge(
    webpackCommon,
    {
        mode: 'development',
        devServer: {
            host: "0.0.0.0",
            compress: true,
            port: process.env.port || 9000,
            compress: true,
            open: true, //是否自动打开浏览器
            //noInfo: true,
            // https: {
            //     key: fs.readFileSync(path.resolve(__dirname, `ssl/privkey.pem`)),
            //     cert: fs.readFileSync(path.resolve(__dirname, `ssl/server.pem`))
            // },
            historyApiFallback: {
                disableDotRule: true
            },
            //noInfo:true,
            proxy: [{
                '/nwesqintegralpublic/*': {
                    target: 'http://fuwu.rsj.beijing.gov.cn/',
                    changeOrigin: true,
                    secure: false,
                    headers: {
                        referer: 'http://fuwu.rsj.beijing.gov.cn/nwesqintegralpublic/settleperson/settlePersonTable',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }
            }]
        }
    });
var path = require('path');
var webpackCommon = require('./webpack.common')

module.exports = Object.assign(
    webpackCommon,
    {
        mode: 'production'
    });
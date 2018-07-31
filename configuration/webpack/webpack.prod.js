const commonConfig = require('./webpack.common');

module.exports = Object.assign(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map'
});
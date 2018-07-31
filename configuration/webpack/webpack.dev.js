const commonConfig = require('./webpack.common');

module.exports = Object.assign(commonConfig, {
    devtool: 'source-map',
    mode: 'development'
});
const commonConfig = require('./webpack.common');

module.exports = Object.assign(commonConfig, {
    mode: 'production',
    devtool: 'nosources-source-map'
});
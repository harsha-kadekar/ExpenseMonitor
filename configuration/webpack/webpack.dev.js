const commonConfig = require('./webpack.common');

module.exports = Object.assign(commonConfig, {
    devtool: 'eval-source-map',
    mode: 'development'
});
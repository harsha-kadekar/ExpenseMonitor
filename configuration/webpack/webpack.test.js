const commonConfig = require('./webpack.common');

module.exports = Object.assign(commonConfig, {
    mode: 'production',
    devtools: 'hidden-source-map'
});
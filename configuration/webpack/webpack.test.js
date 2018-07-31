const commonConfig = require('./webpack.common');

module.exports = Object.assign(commonConfig, {
    mode: 'test',
    devtools: 'inline-source-map'
});
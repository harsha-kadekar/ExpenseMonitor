const path = require('path');

const webpackConfig = require('./webpack/webpack.prod.js');

module.exports = function(config) {
    config.set({
        basePath: '',
        plugins: [
            'karma-jasmine',
            'karma-webpack',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine-jquery'
        ],
        frameworks: ['jasmine'],

        exclude: [

        ],

        files: [
            '../test/index.js'
        ],

        preprocessors: {
            '../test/index.js': ['webpack', 'coverage']
        },

        webpack: webpackConfig,

        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: path.join(__dirname, '../coverage'),
            reporters: [
                {
                    type: 'text-summary',
                    subdir: '.',
                    file: 'coverage-report-js.txt'
                },
                {
                    type: 'html',
                    subdir: '.',
                    file: 'coverage-report-js.html'
                }
            ]
        },
        port: 8200,
        runnerPort: 9100,
        browserNoActivityTimeout: 10000,
        browserDisconnectTolerance: 2,
        colors: true,
        logLevel: config.LOG_DEBUG,
        singleRun: true,
        autoWatch: false,
        usePolling: false,
        autoWatchBatchDelay: 2000,

        browsers: ['PhantomJS', 'Chrome'],
    });
}
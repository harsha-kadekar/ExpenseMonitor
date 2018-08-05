const gulp = require('gulp');
const path = require('path');
const del = require('del');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const uuid = require('uuid/v4');
const log = require('fancy-log');
const pluginError = require('plugin-error');


const webpackDevConfig = require('./configuration/webpack/webpack.dev');
const webpackProdConfig = require('./configuration/webpack/webpack.prod');
const webpackTestConfig = require('./configuration/webpack/webpack.test');

const PORT = 8000;

gulp.task('webpack-dev', function(){
    const devStatsConfig = {
        stats: {
            chunks: false,
            cached: false,
            hash: false,
            version: false,
            timings: false,
            colors: true
        },
        historyApiFallback: true,
        disableHostCheck: true,
        headers: {
            "Set-Cookie": "CsrfToken=" + uuid()
        },
        before: function(app){

        }
    };

    new webpackDevServer(webpack(webpackDevConfig), devStatsConfig).listen(PORT, 'localhost', function(error){
        if(error){
            throw new pluginError({
                plugin: 'webpack-dev-server',
                message: error
            });
        }
        log.info('[webpack-dev-server]', 'listening on port: ', PORT);
    });

});

gulp.task('webpack-prod', function(done){
    webpack(webpackProdConfig, function(error, stats){
        const errCount = stats.compilation.errors.length;
        if(error || errCount > 0){
            stats.compilation.errors.forEach(function(err){
                log.error('[webpack][error]', err.rawMessage || err.message || err);
            });
            throw new pluginError({
                plugin: 'webpack',
                message: 'Error compiling sources'+ error
            });
        }
        done();
    });

});

gulp.task('webpack-test', function(){

});

gulp.task('karma-test', function(){

});

gulp.task('clean', function(){
    return del([
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, 'build'),
        path.join(__dirname, 'dist')
    ], {force: true});

});

gulp.task('generate-coverage', function(){

});

gulp.task('karma-watch', function(){

});

gulp.task('protractor-local', function(){

});

gulp.task('protractor-server', function(){

});

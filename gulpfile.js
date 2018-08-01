// REFERRENCE - https://luwenhuang.wordpress.com/2015/01/18/refactoring-an-angular-app-to-use-webpack-and-gulp/

var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var uuid = require('uuid/v4');
var log = require('fancy-log');
var pluginError = require('plugin-error');

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

gulp.task('webpack-prod', function(){

});

gulp.task('webpack-test', function(){

});

gulp.task('karma-test', function(){

});

gulp.task('clean', function(){

});

gulp.task('generate-coverage', function(){

});

gulp.task('karma-watch', function(){

});

gulp.task('protractor-local', function(){

});

gulp.task('protractor-server', function(){

});

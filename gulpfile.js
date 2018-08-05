const gulp = require('gulp');
const path = require('path');
const del = require('del');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const uuid = require('uuid/v4');
const log = require('fancy-log');
const pluginError = require('plugin-error');
const karmaServer = require('karma').Server;
const fs = require('fs');
const open = require('gulp-open');
const protractor = require('gulp-protractor').protractor;
const webdriver_standalone = require("gulp-protractor").webdriver_standalone;
const webdriver_update = require("gulp-protractor").webdriver_update;
const express = require('express');


const webpackDevConfig = require('./configuration/webpack/webpack.dev');
const webpackProdConfig = require('./configuration/webpack/webpack.prod');

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

gulp.task('karma-test', function(done){
    new karmaServer({
        configFile: path.join(__dirname, 'configuration/karma.conf'),
        singleRun: true
    }, done ).start();
});

gulp.task('clean', function(){
    return del([
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, 'build'),
        path.join(__dirname, 'dist'),
        path.join(__dirname, 'coverage')
    ], {force: true});

});

gulp.task('print-coverage', function(done){
    fs.readFile('coverage/coverage-report-js.txt', {encoding: 'utf-8', flag: 'rs'}, function(e, data) {
        if (e){
            log.error(e);
        } else {
            log.info(data);
        }
        
    });
    done();
});

gulp.task('web-show-coverage', function(done){
    fs.readFile('coverage/coverage-report-js.txt', {encoding: 'utf-8', flag: 'rs'}, function(e, data) {
        if (e){
            log.error(e);
        } else {
            log.info(data);
        }
        
    });

    gulp.src('./coverage/index.html')
        .pipe(open());
    done();
});

gulp.task('karma-watch', function(done){
    new karmaServer({
        configFile: path.join(__dirname, 'configuration/karma.conf'),
        singleRun: false,
        autoWatch: true
    }, done).start();

});

gulp.task('webdriver-update', webdriver_update);
gulp.task('webdriver-standalone', webdriver_standalone);

gulp.task('protractor-local', function(done){
    gulp.src(['e2e/index.js'], { read: false })
		.pipe(protractor({
			configFile: 'configuration/protractor.local.conf.js',
			args: ['--baseUrl', 'http://localhost:8080/']
		})).on('error', function(e) {
            throw new pluginError({
                plugin: 'protractor',
                message: 'Error compiling sources'+ e
            });
			done();
		}).on('end', function() {
			done();
		});
});

gulp.task('local-app-host', function(){
    var app = express();

    // Serve only the static files form the dist directory
    app.use(express.static(__dirname + '/dist/'));

    app.get('/*', function(req,res) {

            res.sendFile(path.join(__dirname+'/dist/index.html'));
    });


    log.info("Starting the server.....");
    // Start the app by listening on the default Heroku port
    app.listen(process.env.PORT || 8080);
    log.info("Started Server....");
});

gulp.task('webdriver', gulp.series('webdriver-update', 'webdriver-standalone'));

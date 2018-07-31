// REFERRENCE - https://luwenhuang.wordpress.com/2015/01/18/refactoring-an-angular-app-to-use-webpack-and-gulp/

var gulp = require('gulp');
var path = require('path');
var gulpWebpack = require('gulp-webpack');
var $ = require('gulp-load-plugins');

const webpackDevConfig = require('./configuration/webpack/webpack.dev');
const webpackProdConfig = require('./configuration/webpack/webpack.prod');
const webpackTestConfig = require('./configuration/webpack/webpack.test');

gulp.task('webpack', function(){
    return gulp.src('src/index.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest('build/Release/'));
});

gulp.task('copyIndex', function(){
    return gulp.src('src/index.html')
    .pipe(gulp.dest('build/Release/'));
});

gulp.task('server', ['connect'], function(){
    require('opn')('http://localhost:9000')
});

gulp.task('connect', function(){
    var connect = require('connect');
    var app = connect()
                .use(require('connect-livereload')({port:35729}))
                .use(require('connect-modrewrite')([
                    '!(\\..+)$ / [L]',
                ]))
                .use(connect.static('build/Release'))
                .use(connect.directory('build/Release'));

    require('http').createServer(app)
                    .listen(9000)
                    .on('listening', function(){
                        console.log('Started connect web server at http://localhost:9000')
                    });
});

gulp.task('watch', ['connect', 'server'], function(){
    var server = $.livereload();

    gulp.watch([
        'build/Release/index.html',
        'build/Release/bundle.js'
    ]).on('change', function(file){
        server.changed(file.path);
    });

    gulp.watch('src/app/**/*', ['webpack']);
    gulp.watch('src/index.html', ['copyIndex'])
});

gulp.task('vendor', function(){
    return gulp.src([
        'src/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'src/bower_components/angular/angular.min.js'
    ])
    .pipe($.order([
        'angular/angular.min.js',
        'angular-ui-router/release/angular-ui-router.min.js'
    ], {base: './src/bower_components'}))
    .pipe($.concat('vendor.js'))
    .pipe($.size())
    .pipe(gulp.dest('build/Release/'));
});

'use strict';

const gulp = require('gulp');
const path = require('path');
const Server = require('karma').Server;
const coveralls = require('gulp-coveralls');

gulp.task('test', function (done) {
    var server = new Server({
        configFile: path.join(__dirname + '/../test/karma.conf.js')
    }, done);

    server.start();
});

gulp.task('buildAndTest', ['build', 'test']);

gulp.task('test:debug', function (done) {
    var server = new Server({
        configFile: path.join(__dirname + '/../test/karma.conf.js'),
        browsers: ['Chrome'],
        singleRun: false
    }, done);

    server.start();
});

gulp.task('coveralls', function () {
    gulp.src(path.join(__dirname, '../test/results/lcov.info'))
        .pipe(coveralls());
});

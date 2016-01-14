'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', function () {
    return gulp
        .src([
            '../*.js',
            './src/**/*.js',
            './test/**/*.js',
            './example/**/*.js',
            './gulp/**/*.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

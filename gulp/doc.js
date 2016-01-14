'use strict';

const gulp = require('gulp');
const path = require('path');
const gulpDocs = require('gulp-ngdocs');

gulp.task('ngdocs', function () {
    return gulp
        .src(path.join(__dirname, '../src/*.js'))
        .pipe(gulpDocs.process())
        .pipe(gulp.dest(path.join(__dirname, '../docs')));
});

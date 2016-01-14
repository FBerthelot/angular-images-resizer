'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('build', ['clean'], function () {
    return gulp
        .src(['src/resize.js', 'src/*.js'])
        .pipe(concat('angular-images-resizer.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('build:ghPage', ['clean:dist', 'ngdocs', 'build:ghPage:docs', 'build:ghPage:node_modules'], function () {
    return gulp
        .src([
            'example/**/*',
            'docs',
            'angular-images-resizer.js'
        ])
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build:ghPage:docs', function () {
    return gulp
        .src('docs/**/*')
        .pipe(gulp.dest('./dist/docs'));
});

gulp.task('build:ghPage:node_modules', function () {
    return gulp
        .src([
            'node_modules/angular-animate/*',
            'node_modules/angular-ui-router/**/*',
            'node_modules/angular-material/*',
            'node_modules/angular/*',
            'node_modules/angular-aria/*'
        ], { base: './' })
        .pipe(gulp.dest('./dist'));
});

'use strict';

const gulp = require('gulp');
const path = require('path');
const browserSync = require('browser-sync').create();

gulp.task('serve', ['build', 'ngdocs'], function () {
    browserSync.init({
        server: {
            baseDir: path.join(__dirname, '../'),
            directory: true,
            routes: {
                '/example/node_modules': path.join(__dirname, '../node_modules'),
                '/example/angular-images-resizer.js': path.join(__dirname, '../angular-images-resizer.js'),
                '/example/docs': path.join(__dirname, '../docs')
            }
        }
    });

    gulp.watch(path.join(__dirname, '../src/**/*.js'), ['serve:buildAndReload', 'ngdocs']);
    gulp.watch(path.join(__dirname, '../example/**/*'), ['serve:buildAndReload']);
    gulp.watch(path.join(__dirname, '../test/**/*-test.js'), ['test']);
});

gulp.task('serve:buildAndReload', ['build'], browserSync.reload);

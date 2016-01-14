'use strict';
/* eslint-env node */
/* eslint-globals require: true */

var gulp = require('gulp');
var wrench = require('wrench');

wrench
    .readdirSyncRecursive('./gulp')
    .filter(function (file) {
        return (/\.(js)$/i).test(file);
    })
    .map(function (file) {
        require('./gulp/' + file);
    });

gulp.task('default', ['lint', 'test'], function () {
    gulp.start('build');
});

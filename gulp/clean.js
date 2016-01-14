'use strict';

const gulp = require('gulp');
const path = require('path');
const rm = require('rimraf');

gulp.task('clean', function (done) {
    rm(path.join(__dirname, '../angular-images-resizer.js'), done);
});

gulp.task('clean:dist', function (done) {
    rm(path.join(__dirname, '../dist/docs/'), () => {
        rm(path.join(__dirname, '../dist/src/'), () => {
            rm(path.join(__dirname, '../dist/angular-images-resizer.js'), () => {
                rm(path.join(__dirname, '../dist/favicon.ico'), () => {
                    rm(path.join(__dirname, '../dist/index.html'), () => {
                        done();
                    });
                });
            });
        });
    });
});

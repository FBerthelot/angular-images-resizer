/**
 * Created by berthelot on 05/11/14.
 */
'use strict';

module.exports = function (grunt) {
    grunt.config.merge({
        uglify: {
            dist: {
                files: {
                    'angular-images-resizer.js': ['src/{,*/}*.js']
                }
            }
        }
    });
};
/**
 * Created by berthelot on 05/11/14.
 */
'use strict';

module.exports = function (grunt) {
    grunt.config.merge({
        'mocha_phantomjs': {
            all: ['test/**/*.html']
        }
    });
};
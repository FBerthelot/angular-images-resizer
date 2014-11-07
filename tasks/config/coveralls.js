/**
 * Created by berthelot on 05/11/14.
 */
'use strict';

module.exports = function (grunt) {
    grunt.config.merge({
        coveralls: {
            options: {
                src: 'test/results/results.info',
                force: false
            },
            'your_target': {
                src: 'test/results/extra-results-*.info'
            }
        }
    });
};
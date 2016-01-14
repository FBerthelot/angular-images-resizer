// Karma configuration
// Generated on Wed Nov 05 2014 18:30:22 GMT+0100 (CET)
'use strict';

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['phantomjs-shim', 'mocha', 'chai'],


        // list of files / patterns to load in the browser
        files: [
            {pattern: './fixture/*', watched: false, included: false, served: true, nocache: false},

            '../node_modules/angular/angular.js',

            '../node_modules/angular-mocks/angular-mocks.js',

            '../src/resize.js',
            '../src/*.js',
            //'../angular-images-resizer.js',

            //Test-Specific Code
            './*-test.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '../src/*.js': ['coverage'],
            '!../src/resizeLocalPic.js': ['coverage']
        },

        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['nyan', 'coverage'],

        coverageReporter: {
            type: 'lcovonly',
            dir: './',
            subdir: '/results/'
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        plugins: [
            require('karma-nyan-reporter'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-shim'),
            require('karma-coverage'),
            require('karma-mocha'),
            require('karma-chai')
        ]
    });
};

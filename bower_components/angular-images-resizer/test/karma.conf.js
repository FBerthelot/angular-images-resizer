// Karma configuration
// Generated on Wed Nov 05 2014 18:30:22 GMT+0100 (CET)
'use strict';

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
        //3rd Party Code
        '../bower_components/angular/angular.js',
        '../bower_components/angular-mocks/angular-mocks.js',
        '../node_modules/chai/chai.js',
        '../bower_components/mocha/mocha.js',
        '../bower_components/chai/chai.js',

        //App-specific Code
        '../src/resize.js',
        '../src/*.js',

        //Ressources for testing (fixtures)
        {pattern: 'fixture/*', watched: false, included: false, served: true},
        //Test-Specific Code
        '*.js'
    ],
    proxies: {
            '/fixture/img.jpg': 'https://raw.githubusercontent.com/FBerthelot/angular-images-resizer/master/test/fixture/img.jpg',
            '/fixture/img.png': 'https://raw.githubusercontent.com/FBerthelot/angular-images-resizer/master/test/fixture/img.png'
    },

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '../src/*.js': ['coverage'],
        '!../src/resizeLocalPic.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        type : 'lcovonly',
        dir : './',
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
    singleRun: true
  });

};

// Karma configuration
// 
//  karma v0.13.10
//  jasmine v2.3.2
//  jasmine-core v2.3.4
// 
// Generated on Thu Oct 08 2015 12:57:10 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/jquery-i18n-properties/jquery.i18n.properties.js',
        'bower_components/lodash/lodash.min.js',
        'bower_components/restangular/dist/restangular.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-cache/dist/angular-cache.js',
        'app/app.js',
        'app/Modules.js',
        'app/Plugins.js',
        'app/tests/*.js',
        'modules/*/tests/*.js',
        'plugins/*/tests/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 8082,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    
    client: {
      captureConsole: true
    }
  })
}
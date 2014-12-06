/**
 * Routes of the application
 * Created by grenat on 16/06/14.
 */
'use strict';

angular.module('app')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'components/mainScreen/mainScreen.html',
                controller: 'mainScreenCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
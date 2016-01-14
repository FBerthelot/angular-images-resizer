'use strict';
(function () {
    angular.module('imageResizer', [
        'ngAnimate',
        'ui.router',
        'ngMaterial',
        'SideNav',
        'NavBar',
        'images-resizer',
        'resizeToolBox'
    ]).config(imageResizerConfig);

    function imageResizerConfig ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'src/app/main/main.html',
            controller: 'MainController'
        });

        $urlRouterProvider.otherwise('/');
    }
})();

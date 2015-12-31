'use strict';

(function () {
    angular
        .module('NavBar', [])
        .directive('navBarDir', navBarDir);

    function navBarDir ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/app/navbar/navbar.html',
            link: function (scope) {
                scope.toggleMenu = function () {
                    $rootScope.$emit('toggleMenu');
                };

                scope.saveImg = function () {
                    $rootScope.$emit('saveImg');
                };
            }
        };
    }
})();

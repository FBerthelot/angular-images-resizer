'use strict';
(function () {
    angular
        .module('SideNav', [])
        .directive('sideNavDir', sideNavDir);

    function sideNavDir ($rootScope, $mdSidenav) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/app/sidenav/sidenav.html',
            link: function (scope) {

                $rootScope.$on('toggleMenu', function() {
                    $mdSidenav('left').toggle();
                });

                $rootScope.$on('disableResizeBtn', function () {
                    scope.resizeBtnDisabled = true;
                });

                $rootScope.$on('activateResizeBtn', function () {
                    scope.resizeBtnDisabled = false;
                });

                scope.resizeBtnDisabled = true;

                scope.close = function() {
                    $mdSidenav('left').close();
                };

                scope.clickOnButton = function(btnName) {
                    $rootScope.$emit('sideNavBtnClick', btnName);
                };
            }
        };
    }
})();

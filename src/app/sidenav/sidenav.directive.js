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

                var toggleMenuWatch = $rootScope.$on('toggleMenu', function () {
                    $mdSidenav('left').toggle();
                });

                var disableResizeBtnWatch = $rootScope.$on('disableResizeBtn', function () {
                    scope.resizeBtnDisabled = true;
                });

                var activateResizeBtnWatch = $rootScope.$on('activateResizeBtn', function () {
                    scope.resizeBtnDisabled = false;
                });

                scope.resizeBtnDisabled = true;

                scope.close = function () {
                    $mdSidenav('left').close();
                };

                scope.clickOnButton = function (btnName) {
                    $rootScope.$emit('sideNavBtnClick', btnName);
                };

                scope.$on('$destroy', activateResizeBtnWatch);
                scope.$on('$destroy', disableResizeBtnWatch);
                scope.$on('$destroy', toggleMenuWatch);
            }
        };
    }
})();

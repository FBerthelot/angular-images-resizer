/**
 * Created by berthel on 05/08/14.
 */
'use strict';

angular.module('mainScreen')
    .controller('mainScreenCtrl', ['$scope', '$document', 'resizeService', function($scope, $document, resizeService) {
        $document[0].title = 'Angular-images-resizer';

        /**
         * Basic démonstration of the service
         */
        var basicImgResized = document.createElement('img');
        $scope.basicResize = function() {
            resizeService.startResize('ressources/aurora.jpg', function(err, image){
                if(err) {
                    console.error(err);
                    return;
                }

                basicImgResized.src = image;
                document.getElementById('basicImageResized').appendChild(basicImgResized);
            });
        };



    }]);

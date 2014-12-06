/**
 * Created by berthel on 05/08/14.
 */
'use strict';

angular.module('mainScreen')
    .controller('mainScreenCtrl', ['$scope', '$document', function($scope, $document) {
        $document[0].title = 'Angular-images-resizer demonstration';
        /*resizeService.startResize(myImageSource , function(err, image){
            if(err) {
                console.error(err);
                return;
            }

            var myImageResized = image; //return a base64 image
        });*/
    }]);

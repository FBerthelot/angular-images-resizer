/**
 * Created by berthel on 05/08/14.
 */
'use strict';

angular.module('mainScreen')
    .controller('firstScreenCtrl', ['$scope', '$document', 'resizeService',
        function($scope, $document, resizeService ) {
            $document[0].title = 'Angular-images-resizer demonstration';

    }]);

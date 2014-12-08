/**
 * Created by berthel on 05/08/14.
 */
'use strict';

angular.module('mainScreen')
    .controller('mainScreenCtrl', ['$scope', '$document', 'resizeService', 'readLocalPicService',
        function($scope, $document, resizeService, readLocalPicService) {
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
                    console.log('this is the size in KiloByte of the resized image: ',Math.round((image.length - 'data:image/jpg;base64,'.length)*3/4)/1024);
                    document.getElementById('basicImageResized').appendChild(basicImgResized);
                });
            };

            /**
             * Demonstration from an input
             */
            var inputImgResized = document.createElement('img');
            var inputImg = document.createElement('img');
            var inputResize = function(file) {
                $('.inputTitles').toggle();
                readLocalPicService.readFileInput(file).then(function(img){
                    inputImg.src = img;
                    document.getElementById('inputImg').appendChild(inputImg);

                    resizeService.startResize(img, function(err, image){
                        if(err) {
                            console.error(err);
                            return;
                        }
                        inputImgResized.src = image;
                        console.log('this is the size in KiloByte of the resized image: ',Math.round((image.length - 'data:image/jpg;base64,'.length)*3/4)/1024);
                        document.getElementById('inputImageResized').appendChild(inputImgResized);
                    });
                }, function(err){
                    console.error(err);
                });
            };

            //Bind the input file with the function on the top of this message
            $('#fileInput').change(function() {
                inputResize(this);
            });
    }]);

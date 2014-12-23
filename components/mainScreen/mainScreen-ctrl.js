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
            $scope.basicResize = function() {
                //resize by width
                resizeService.resizeImage('ressources/aurora.jpg', {width: 500}, function(err, image){
                    if(err) {
                        console.error(err);
                        return;
                    }
                    var basicImgResizedWidth = document.createElement('img');
                    basicImgResizedWidth.src = image;
                    document.getElementById('basicImageResizedWidth').appendChild(basicImgResizedWidth);
                    $('#basicImageResizedWidth').removeClass('hidden');
                });

                //resize by height
                resizeService.resizeImage('ressources/aurora.jpg', {height: 500}, function(err, image){
                    if(err) {
                        console.error(err);
                        return;
                    }

                    var basicImgResizedHeight = document.createElement('img');
                    basicImgResizedHeight.src = image;
                    document.getElementById('basicImageResizedHeight').appendChild(basicImgResizedHeight);
                    $('#basicImageResizedHeight').removeClass('hidden');
                });

                //resize by both width and height
                resizeService.resizeImage('ressources/aurora.jpg', {width: 500, height: 500}, function(err, image){
                    if(err) {
                        console.error(err);
                        return;
                    }
                    var basicImgResizedBoth = document.createElement('img');
                    basicImgResizedBoth.src = image;
                    document.getElementById('basicImageResizedHeightAndWidth').appendChild(basicImgResizedBoth);
                    $('#basicImageResizedHeightAndWidth').removeClass('hidden');
                });

                //resize by size
                resizeService.resizeImage('ressources/aurora.jpg', {size: 100, sizeScale: 'ko'}, function(err, image){
                    if(err) {
                        console.error(err);
                        return;
                    }
                    var basicImgResizedSize = document.createElement('img');
                    basicImgResizedSize.src = image;
                    document.getElementById('basicImageResizedbySize').appendChild(basicImgResizedSize);
                    $('#basicImageResizedbySize').removeClass('hidden');
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

                    resizeService.resizeImage(img, {width: 500, height: 500}, function(err, image){
                        if(err) {
                            console.error(err);
                            return;
                        }
                        inputImgResized.src = image;
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

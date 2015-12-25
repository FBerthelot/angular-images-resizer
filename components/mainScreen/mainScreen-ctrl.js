/**
 * Created by berthel on 05/08/14.
 */
'use strict';

angular.module('mainScreen')
    .controller('mainScreenCtrl', ['$scope', 'resizeService', '$location',  '$anchorScroll', 'readLocalPicService', '$log',
        function($scope, resizeService, $location,  $anchorScroll, readLocalPicService, $log) {
            document.title = 'Angular-images-resizer';

            /**
             * Basic démonstration of the service
             */
            $scope.basicResize = function() {
                //resize by width
                resizeService.resizeImage('ressources/aurora.jpg', {width: 500}, function(err, image){
                    if(err) {
                        $log.error(err);
                        return;
                    }
                    var basicImgResizedWidth = document.createElement('img');
                    basicImgResizedWidth.src = image;
                    document.getElementById('basicImageResizedWidth').appendChild(basicImgResizedWidth);
                    document.querySelector('#basicImageResizedWidth').classList.remove('hidden');
                });

                //resize by height
                resizeService.resizeImage('ressources/aurora.jpg', {height: 500}, function(err, image){
                    if(err) {
                        $log.error(err);
                        return;
                    }

                    var basicImgResizedHeight = document.createElement('img');
                    basicImgResizedHeight.src = image;
                    document.getElementById('basicImageResizedHeight').appendChild(basicImgResizedHeight);
                    document('#basicImageResizedHeight').removeClass('hidden');
                });

                //resize by both width and height
                resizeService.resizeImage('ressources/aurora.jpg', {width: 500, height: 500}, function(err, image){
                    if(err) {
                        $log.error(err);
                        return;
                    }
                    var basicImgResizedBoth = document.createElement('img');
                    basicImgResizedBoth.src = image;
                    document.getElementById('basicImageResizedHeightAndWidth').appendChild(basicImgResizedBoth);
                    document.querySelector('#basicImageResizedHeightAndWidth').classList.remove('hidden');
                });

                //resize by size
                resizeService.resizeImage('ressources/aurora.jpg', {size: 100, sizeScale: 'ko'}, function(err, image){
                    if(err) {
                        $log.error(err);
                        return;
                    }
                    var basicImgResizedSize = document.createElement('img');
                    basicImgResizedSize.src = image;
                    document.getElementById('basicImageResizedbySize').appendChild(basicImgResizedSize);
                    document.querySelector('#basicImageResizedbySize').classList.remove('hidden');
                });
            };

            /**
             * Demonstration from an input
             */
            var inputImgResized = document.createElement('img');
            var inputImg = document.createElement('img');
            var inputResize = function(file) {
                document.querySelector('.inputTitles').classList.toggle('hide');

                readLocalPicService.readFileInput(file).then(function(img){
                    inputImg.src = img;
                    document.getElementById('inputImg').appendChild(inputImg);

                    resizeService.resizeImage(img, {width: 500, height: 500}, function(err, image){
                        if(err) {
                            $log.error(err);
                            return;
                        }
                        inputImgResized.src = image;
                        document.getElementById('inputImageResized').appendChild(inputImgResized);
                    });
                }, function(err){
                    $log.error(err);
                });
            };

            //Bind the input file with the function on the top of this message
            document.querySelector('#fileInput').addEventListener('change', function() {
                inputResize(this);
            });


            //http://stackoverflow.com/questions/14712223/how-to-handle-anchor-hash-linking-in-angularjs
            $scope.scrollTo = function(id) {
                $location.hash(id);
                $anchorScroll();
            }
    }]);

/**
 * Created by berthelot on 03/11/14.
 * Based on https://github.com/nicam/js-resize/blob/master/resize.js
 */
'use strict';

angular.module('images-resizer')
    .service('resizeService', ['$q', function($q) {

        var mainCanvas;
        var _this = this;

        /*
         * Creates a new image object from the src
         * Uses the deferred pattern
         */
        this.createImage = function (src) {
            var deferred = $q.defer();
            var img = new Image();

            img.onload = function() {
                deferred.resolve(img);
            };

            img.src = src;

            return deferred.promise;
        };

        function isCanvasSupported(){
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        }
        var canvasSupported = isCanvasSupported();


        /*
         * Resize image by height
         */
        this.resizeByHeight = function (src, height, cb) {
            if(!canvasSupported) {
                cb('Canvas is not supported on your browser', null);
                return;
            }
            _this.createImage(src).then(
                function(img) {
                    cb(null, _this.resizeImageWidthHeight(img, null, height));
                },
                function(err) {
                    cb(err, null);
                }
            );
        };
        this.resizeByWidth = function (src, width, cb) {
            if(!canvasSupported) {
                cb('Canvas is not supported on your browser', null);
                return;
            }
            _this.createImage(src).then(
                function(img) {
                    cb(null, _this.resizeImageWidthHeight(img, width));
                },
                function(err) {
                    cb(err, null);
                }
            );
        };
        this.resizeByWidthAndHeight = function (src, width, height, cb) {
            if(!canvasSupported) {
                cb('Canvas is not supported on your browser', null);
                return;
            }
            _this.createImage(src).then(
                function(img) {
                    cb(null, _this.resizeImageWidthHeight(img, width, height));
                },
                function(err) {
                    cb(err, null);
                }
            );
        };
        this.resizeBySize =function(src, size, cb) {
            if(!canvasSupported) {
                cb('Canvas is not supported on your browser', null);
                return;
            }
            _this.createImage(src).then(
                function(img) {
                    cb(null, _this.resizeToSize(img, size));
                },
                function(err) {
                    cb(err, null);
                }
            );
        };

        this.resizeImageWidthHeight = function(image, width, height) {
            if(!image) {
                return null;
            }
            mainCanvas = document.createElement('canvas');

            //Check what width and height the resized image must to be !
            if(!width && ! height){
                mainCanvas.width = image.width;
                mainCanvas.height = image.height;
            }
            else if(!width && height) {
                mainCanvas.height = height;
                mainCanvas.width = (image.width * image.height) / height;
            }
            else if(width && !height){
                mainCanvas.width = width;
                mainCanvas.height = (image.width * image.height) / width;
            }
            else {
                mainCanvas.width = width;
                mainCanvas.height = height;
            }

            mainCanvas.getContext('2d').drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);
            return mainCanvas.toDataURL('image/jpeg');
        };

        /*
         * Draw the image object on a new canvas and half the size of the canvas
         * until the target size has been reached
         * Afterwards put the base64 data into the target image
         * Now we can add specific size
         */
        this.resizeToSize = function (image, size) {
            if(!image){
                return null;
            }
            if(!size) { size=600; }
            mainCanvas = document.createElement('canvas');
            mainCanvas.width = image.width;
            mainCanvas.height = image.height;

            mainCanvas.getContext('2d').drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);
            var tmpResult = mainCanvas.toDataURL('image/jpeg');

            while(tmpResult.length() > size) {
                var canvas = document.createElement('canvas');
                canvas.width = mainCanvas.width / 2;
                canvas.height = mainCanvas.height / 2;

                canvas.getContext('2d').drawImage(mainCanvas, 0, 0, canvas.width, canvas.height);

                mainCanvas =  canvas;
                tmpResult = mainCanvas.toDataURL('image/jpeg');
            }

            return tmpResult;
        };

    }]);
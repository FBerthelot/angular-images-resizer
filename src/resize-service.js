/**
 * Created by berthelot on 03/11/14.
 * Based on https://github.com/nicam/js-resize/blob/master/resize.js
 */
'use strict';

angular.module('resize')
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

        /*
         * Create an Image, when loaded pass it on to the resizer
         */
        this.startResize = function (src, cb) {
            _this.createImage(src).then(
                function(img) {
                    cb(null, _this.resize(img));
                },
                function(err) {
                    cb(err, null);
                }
            );
        };

        /*
         * Draw the image object on a new canvas and half the size of the canvas
         * until the target size has been reached
         * Afterwards put the base64 data into the target image
         */
        this.resize = function (image) {

            mainCanvas = document.createElement('canvas');
            mainCanvas.width = image.width;
            mainCanvas.height = image.height;

            mainCanvas.getContext('2d')
                .drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);

            while (mainCanvas.width > 480) {
                mainCanvas = _this.halfSize(mainCanvas);
            }

            return mainCanvas.toDataURL('image/jpeg');
        };

        /*
         * Draw initial canvas on new canvas and half it's size
         */
        this.halfSize = function (i) {
            var canvas = document.createElement('canvas');
            canvas.width = i.width / 2;
            canvas.height = i.height / 2;
            
            canvas.getContext('2d')
                .drawImage(i, 0, 0, canvas.width, canvas.height);
                
            return canvas;
        };
    }]);
/**
 * Created by berthelot on 03/11/14.
 * Based on https://github.com/nicam/js-resize/blob/master/resize.js
 */
'use strict';

angular.module('images-resizer')
    .service('resizeService', ['$q', function($q) {

        var mainCanvas;
        var _this = this;

        var canvasSupported = !!(document.createElement('canvas').getContext && document.createElement('canvas').getContext('2d'));

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
         * Resize image by height
         */
        this.resizeImage = function(src, options, cb) {
            //if no callback is specified or canvas is not supported
            if(!canvasSupported || !options) {
                cb('Canvas is not supported on your browser', null);
                return;
            }

            options = {
                height: options.height ? options.height : options.width ? null: options.size ? null: 1024,
                width: options.width ? options.width : options.height ? null: options.size ? null: 1024,
                size: options.size ? options.size : 500,
                sizeScale: options.size ? options.size : 'ko',
                step: options.step ? options.step : 3
            };

            _this.createImage(src).then(
                function(img) {
                    if (options.height || options.width) {
                        _this.createImage(src).then(
                            function (img) {
                                cb(null, _this.resizeImageWidthHeight(img, options.width, options.height , options.step));
                            },
                            function (err) {
                                cb(err, null);
                            }
                        );
                    }
                    else if (options.size) {
                        //conversion of the size in bytes
                        switch (options.size.toLowerCase()) {
                            case 'ko':
                                options.size *= 1024;
                                break;
                            case 'mo':
                                options.size *= 1024 * 1024;
                                break;
                            case 'go':
                                options.size *= 1024 * 1024 * 1024;
                                break;
                            default:
                                break;
                        }
                        cb(null, _this.resizeImageBySize(img, options.size, options.step));
                    }
                },
                function(err) {
                    cb(err, null);
                });
        };


        this.resizeImageWidthHeight = function(image, width, height, step) {
            if(!image) { return null; }

            mainCanvas = document.createElement('canvas');

            //Check what width and height the resized image must to be !
            if(!width && ! height){
                width = image.width;
                height = image.height;
            }
            else if(!width && height) {
                width = (image.width * image.height) / height;
            }
            else if(width && !height){
                height = (image.width * image.height) / width;
            }

            var pixelStepWidth = image.width === width ? 0 : (image.width - width)/step;
            var pixelStepHeight = image.height === height ? 0 : (image.height- height)/step;
            mainCanvas.width = image.width;
            mainCanvas.height = image.height;


            mainCanvas.getContext('2d').drawImage(image, 0, 0, mainCanvas.width , mainCanvas.height);
            for(var i=1; i< step; i++){
                mainCanvas.width = image.width - (pixelStepWidth * i);
                mainCanvas.height = image.height- (pixelStepHeight * i);
                mainCanvas = document.createElement('canvas').getContext('2d').drawImage(mainCanvas, 0, 0, mainCanvas.width, mainCanvas.height);
            }
            mainCanvas = document.createElement('canvas').getContext('2d').drawImage(mainCanvas, 0, 0, width, height);

            console.log('image',image.width ,image.height ,width , height, step, pixelStepWidth, pixelStepHeight);
            return mainCanvas.toDataURL('image/jpeg');
        };

        this.resizeImageBySize = function (image, size) {
            if(!image){
                return null;
            }
            mainCanvas = document.createElement('canvas');
            mainCanvas.width = image.width;
            mainCanvas.height = image.height;

            mainCanvas.getContext('2d').drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);
            var tmpResult = mainCanvas.toDataURL('image/jpeg');

            while((Math.round(tmpResult.length - 'data:image/jpg;base64,'.length)*3/4) > size) {
                var canvas = document.createElement('canvas');
                canvas.width = mainCanvas.width /2;
                canvas.height = mainCanvas.height / 2;

                canvas.getContext('2d').drawImage(mainCanvas, 0, 0, canvas.width, canvas.height);

                mainCanvas =  canvas;
                tmpResult = mainCanvas.toDataURL('image/jpeg');
            }

            return tmpResult;
        };

    }]);
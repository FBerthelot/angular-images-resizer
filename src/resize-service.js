/**
 * Created by berthelot on 03/11/14.
 * Based on https://github.com/nicam/js-resize/blob/master/resize.js
 */
'use strict';

/**
 * @ngdoc service
 * @name images-resizer.service:resizeService
 * @description
 * Main service which resize images and so on
 */
angular
    .module('images-resizer')
    .service('resizeService', ['$q', '$document', '$window', function ($q, $document, $window) {
        var mainCanvas;
        var service = this;

        var isCanvasSupported = !!($document[0].createElement('canvas').getContext && $document[0].createElement('canvas').getContext('2d'));

        /**
         * @ngdoc function
         * @name #createImage
         * @methodOf images-resizer.service:resizeService
         * @description
         * Creates a new image object according to a source
         * @param {string} src Attribute of an img element
         * @param {boolean} crossOrigin Add the possibility to import cross origin images
         * @returns {Object} A promise with the image
         */
        this.createImage = function (src, crossOrigin) {
            var deferred = $q.defer();
            var img = new $window.Image();

            if (crossOrigin) {
                img.crossOrigin = crossOrigin;
            }

            img.onload = function () {
                deferred.resolve(img);
            };
            img.onabort = function () {
                deferred.reject('image creation was aborted');
            };
            img.onerror = function (err) {
                deferred.reject(err);
            };

            img.src = src;

            return deferred.promise;
        };

        /**
         * @ngdoc function
         * @name #resizeCanvas
         * @methodOf images-resizer.service:resizeService
         * @description
         * Resize a canvas according to the width and height
         * @param {Object} cnv the canvas
         * @param {number} width the final width to resize the canvas
         * @param {number} height the final height to resize the canvas
         * @returns {Object} return the resized canvas
         */
        this.resizeCanvas = function (cnv, width, height) {
            if (!width || !height) {
                return cnv;
            }

            var tmpCanvas = $document[0].createElement('canvas');
            tmpCanvas.width = width;
            tmpCanvas.height = height;
            var cnx = tmpCanvas.getContext('2d');
            cnx.drawImage(cnv, 0, 0, tmpCanvas.width, tmpCanvas.height);
            return tmpCanvas;
        };

        /**
         * @ngdoc function
         * @name #resizeImage
         * @methodOf images-resizer.service:resizeService
         * @description
         * Resize an image with a given src attribute
         * @param {string} src string src attribute of an img element
         * @param {object} options json contain all options to resize an image (see all options available directly in th code below)
         * @return {promise} when the work is done it return the image or an error :)
         */
        this.resizeImage = function (src, options) {
            if (!isCanvasSupported) {
                return $q.reject('Canvas is not supported on your browser');
            }
            if (!options || !src) {
                return $q.reject('Missing argument when calling resizeImage function');
            }

            var deferred = $q.defer();

            options = {
                height: options.height ? options.height : options.width ? null : options.size ? null : 1024,
                width: options.width ? options.width : options.height ? null : options.size ? null : 1024,
                size: options.size ? options.size : 500,
                sizeScale: options.sizeScale ? options.sizeScale : 'ko',
                step: options.step ? options.step : 3,
                outputFormat: options.outputFormat ? options.outputFormat : 'image/jpeg',
                crossOrigin: options.crossOrigin ? options.crossOrigin : null
            };

            service
                .createImage(src, options.crossOrigin)
                .then(function (img) {
                    if (options.height || options.width) {
                        deferred.resolve(service.resizeImageWidthHeight(img, options.width, options.height, options.step, options.outputFormat));
                    }
                    else if (options.size) {
                        //conversion of the size in bytes
                        if (angular.isString(options.sizeScale)) {
                            switch (options.sizeScale.toLowerCase()) {
                                case 'ko':
                                    options.size *= 1024;
                                    break;
                                case 'mo':
                                    options.size *= 1024 * 1024;
                                    break;
                                case 'go':
                                    options.size *= 1024 * 1024 * 1024;
                                    break;
                            }
                        }
                        deferred.resolve(service.resizeImageBySize(img, options.size, options.outputFormat));
                    }
                    else {
                        deferred.reject('Missing option to resize the image');
                    }
                })
                .catch(deferred.reject);

            return deferred.promise;
        };

        /**
         * @ngdoc function
         * @name #resizeImageWidthHeight
         * @methodOf images-resizer.service:resizeService
         * @description
         * Resize image according to the width or the height or both
         * @param {Object} image DomImage html image to resize
         * @param {number} width desired final image width
         * @param {number} height integer desired final image height
         * @param {number} step integer the number of step to finally have the image to the desired size
         * @param {string} outputFormat string the format of the output file for example image/jpeg, image/png,...
         * @returns {string} resized image in base64
         */
        this.resizeImageWidthHeight = function (image, width, height, step, outputFormat) {
            if (!image) {
                return null;
            }
            if (!outputFormat) {
                outputFormat = 'image/jpeg';
            }

            mainCanvas = $document[0].createElement('canvas');

            //Check what width and height the resized image must to be !
            if (!width && !height) {
                width = image.width;
                height = image.height;
            }
            else if (!width && height) {
                width = (height / image.height) * image.width;
            }
            else if (width && !height) {
                height = (width / image.width) * image.height;
            }

            var pixelStepWidth = (image.width === width) || !step ? 0 : (image.width - width) / step;
            var pixelStepHeight = (image.height === height) || !step ? 0 : (image.height - height) / step;
            mainCanvas.width = image.width;
            mainCanvas.height = image.height;

            mainCanvas.getContext('2d').drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);
            for (var i = 1; i < step; i++) {
                var newWidth = image.width - (pixelStepWidth * i);
                var newHeight = image.height - (pixelStepHeight * i);
                mainCanvas = this.resizeCanvas(mainCanvas, newWidth, newHeight);
            }
            mainCanvas = this.resizeCanvas(mainCanvas, width, height);

            return mainCanvas.toDataURL(outputFormat);
        };

        /**
         * @ngdoc function
         * @name #resizeImageBySize
         * @methodOf images-resizer.service:resizeService
         * @description
         * Resize image to the approximately absolute size in octet
         * @param {Object} image htmlImage the miage to resize
         * @param {number} size number the final size in octet
         * @param {string} outputFormat string the format of the output file for example image/jpeg, image/png,...
         * @returns {string} resize image in base64
         */
        this.resizeImageBySize = function (image, targetSize, outputFormat) {
            if (!image) {
                return null;
            }
            if (!outputFormat) {
                outputFormat = 'image/jpeg';
            }

            mainCanvas = $document[0].createElement('canvas');
            mainCanvas.width = image.width;
            mainCanvas.height = image.height;
            mainCanvas.getContext('2d').drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);

            var tmpResult = mainCanvas.toDataURL(outputFormat);
            var result = tmpResult;

            var sizeOfTheImage = service.calulateImageSize(tmpResult, outputFormat);
            var divideStrategy = Math.max(1, Math.min(sizeOfTheImage / targetSize, 200));

            var iteratorLimit = 20;
            while (sizeOfTheImage > targetSize && iteratorLimit !== 0) {
                iteratorLimit--;

                var newImageSize = {
                    width: mainCanvas.width / divideStrategy,
                    height: mainCanvas.height / divideStrategy
                };
                var canvas = this.resizeCanvas(mainCanvas, newImageSize.width, newImageSize.height);

                tmpResult = canvas.toDataURL(outputFormat);
                var sizeOfTheImageTmp = service.calulateImageSize(tmpResult, outputFormat);

                // If result is too far away from target, restart dividing with less agressive strategy.
                if (sizeOfTheImageTmp / targetSize < 0.5 || sizeOfTheImageTmp === 0) {
                    divideStrategy = divideStrategy / 2;
                    // If the divide strategy is below 1, it's mean, that we cannot resize anymore so we stop the loop
                    if (divideStrategy < 1) {
                        iteratorLimit = 0;
                    }
                }
                else { // next iteration will start with a new canvas
                    mainCanvas = canvas;
                    result = tmpResult;
                    sizeOfTheImage = sizeOfTheImageTmp;
                }

                mainCanvas = canvas;
            }
            return result;
        };

        /**
         * @ngdoc function
         * @name #calulateImageSize
         * @methodOf images-resizer.service:resizeService
         * @description
         * Return the size of the img by given the base64 img strings.
         * @param {string} imgString String base64 image
         * @param {string} outputFormat string the format of the output file for example image/jpeg, image/png,...
         * @returns {number} size of the img
         */
        this.calulateImageSize = function (imgString, outputFormat) {
            switch (outputFormat) {
                case 'image/jpeg':
                    outputFormat = 'image/jpg';
                    break;
                default :
                    outputFormat = 'image/jpg';
                    break;
            }
            return Math.max(0, Math.round((imgString.length - ('data:' + outputFormat + ';base64,').length) * 3 / 4));
        };
    }]);

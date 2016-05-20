'use strict';

(function () {
    angular
        .module('imageResizer')
        .controller('MainController', MainCtrl);

    function MainCtrl ($document, $log, $mdBottomSheet, $rootScope, $scope, $timeout, $window, readLocalPicService, resizeService) {
        var canvas = $document[0].getElementById('canvas');
        var context = canvas.getContext('2d');
        $scope.imageInitial = null;
        $scope.imageToModify = null;

        $scope.isImageToModify = false;

        $scope.uploadFile = function (element) {
            readLocalPicService
                .readFileInput(element)
                .then(function (base64Img) {
                    $log.debug('base', base64Img);
                    $rootScope.$emit('activateResizeBtn');
                    $scope.isImageToModify = true;
                    $timeout(function () {
                        resizeService
                            .createImage(base64Img)
                            .then(function (image) {
                                $scope.imageInitial = image;
                                $scope.imageToModify = image;

                                canvas.height = image.height;
                                canvas.width = image.width;
                                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                            })
                            .catch($log.error);
                    });
                })
                .catch($log.error);
        };

        var resizeImgWatch = $rootScope.$on('resizeImg', function (event, width, height) {
            var startTime = Date.now();
            $log.info('Start resizing image');

            resizeService
                .resizeImage($scope.imageToModify.src, {width: width, height: height, outputFormat: 'image/png'})
                .then(function (imgResized) {
                    $log.info('End resizing to width :', width, 'and height :', height);
                    $log.info('Resizing took', Date.now() - startTime, 'ms');

                    resizeService
                        .createImage(imgResized)
                        .then(function (image) {
                            context.clearRect (0, 0, $scope.imageToModify.width, $scope.imageToModify.height);
                            canvas.width = image.width;
                            canvas.height = image.height;
                            $scope.imageToModify = image;
                            context.drawImage(image, 0, 0, image.width, image.height);
                        })
                        .catch($log.error);
                })
                .catch($log.error);
        });

        var resizeImgOctetWatch = $rootScope.$on('resizeImgOctet', function (event, sizeScale, size) {
            var startTime = Date.now();
            $log.info('Start resizing image');

            resizeService
                .resizeImage($scope.imageToModify.src, {sizeScale: sizeScale, size: size, outputFormat: 'image/png'})
                .then(function (imgResized) {
                    $log.info('End resizing to less than', size + '' + sizeScale);
                    $log.info('Resizing took', Date.now() - startTime, 'ms');

                    resizeService
                        .createImage(imgResized)
                        .then(function (image) {
                            context.clearRect (0, 0, $scope.imageToModify.width, $scope.imageToModify.height );
                            $scope.imageToModify = image;
                            canvas.width = image.width;
                            canvas.height = image.height;
                            context.drawImage(image, 0, 0, canvas.width, canvas.height);
                        })
                        .catch($log.error);
                })
                .catch($log.error);
        });

        var sideNavBtnClick = $rootScope.$on('sideNavBtnClick', function (event, btnName) {
            switch (btnName) {
                case 'resizeImgDimension':
                    $mdBottomSheet.show({
                        templateUrl: 'src/app/resizeToolBox/resizeToolBoxWidth.html',
                        controller: 'ResizeToolBoxController',
                        locals: {
                            width: $scope.image ? $scope.image.width : null,
                            height: $scope.image ? $scope.image.height : null
                        }
                    });
                    break;
                case 'resizeImgOctet':
                    $mdBottomSheet.show({
                        templateUrl: 'src/app/resizeToolBox/resizeToolBoxOctet.html',
                        controller: 'ResizeToolBoxController',
                        locals: {
                            width: $scope.image ? $scope.image.width : null,
                            height: $scope.image ? $scope.image.height : null
                        }
                    });
                    break;
                case 'selectImage':
                    $rootScope.$emit('activateResizeBtn');
                    $scope.isImageToModify = true;
                    $timeout(function () {
                        resizeService
                            .createImage('src/assets/images/aurora.jpg')
                            .then(function (image) {
                                $scope.imageInitial = image;
                                $scope.imageToModify = image;
                                canvas.height = image.height;
                                canvas.width = image.width;
                                context.drawImage(image, 0, 0, image.width, image.height);
                            })
                            .catch($log.error);
                    });
                    break;
                case 'unselectImage':
                    $scope.isImageToModify = false;
                    $scope.imageInitial = null;
                    $scope.imageToModify = null;
                    var canvasSize = canvas.getBoundingClientRect();
                    context.clearRect(0, 0, canvasSize.right, canvasSize.width);
                    $rootScope.$emit('disableResizeBtn');
                    break;
            }
        });

        var saveImgWatch = $rootScope.$on('saveImg', function () {
            if (!$scope.imageToModify) { return; }
            $window.location.href = $scope.imageToModify.src.replace('image/png', 'image/octet-stream');
        });

        $rootScope.$on('$destroy', saveImgWatch);
        $rootScope.$on('$destroy', sideNavBtnClick);
        $rootScope.$on('$destroy', resizeImgOctetWatch);
        $rootScope.$on('$destroy', resizeImgWatch);
    }
})();

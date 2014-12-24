/**
 * Created by berthelot on 05/11/14.
 */
'use strict';

describe('[images-resizer][resize-service]', function() {
    var service, rootScope;

    beforeEach(module('images-resizer'));
    beforeEach(inject(function($injector, $rootScope) {
        service = $injector.get('resizeService');
        rootScope = $rootScope;
    }));

    describe('- createImage -', function() {
        it('should return a JS image', function(done) {
            service.createImage('fixture/img.jpg').then(
                function(image) {
                    expect(image).to.be.not.null;
                    done();
                },
                function() {
                    expect(true).to.be.false;
                    done();
                }
            );

            setTimeout(function() {
                rootScope.$digest();
            },1000);
        });
    });

    describe('- resizeImageWidthHeight -', function() {
        it('should return a base64 image with an jpg image in entry with same size', function(done) {
           var img = new Image();
           img.onload = function() {
               var data = service.resizeImageWidthHeight(img);

               expect(data).to.be.not.null;
               expect(data).to.contain('data:image/jpeg;base64');
               //check size of the returned image
               service.createImage(data).then(
                   function(image) {
                       expect(image).to.be.not.null;
                       done();
                   },
                   function() {
                       expect(true).to.be.false;
                       done();
                   }
               );
               setTimeout(function() {
                   rootScope.$digest();
               },500);
           };

           img.src = 'fixture/img.jpg';
        });

        it('should return a base64 image with specific height', function(done) {
           var img = new Image();
           img.onload = function() {
               var data = service.resizeImageWidthHeight(img, null, 300);

               expect(data).to.be.not.null;
               expect(data).to.contain('data:image/jpeg;base64');
                //check size of the returned image
               service.createImage(data).then(
                   function(image) {
                       expect(image).to.be.not.null;
                       expect(image.height).to.be.equal(300);
                       done();
                   },
                   function() {
                       expect(true).to.be.false;
                       done();
                   }
               );
               setTimeout(function() {
                   rootScope.$digest();
               },500);
           };
           img.src = 'fixture/img.jpg';
        });

        it('should return a base64 image with specific width', function(done) {
            var img = new Image();
            img.onload = function() {
                var data = service.resizeImageWidthHeight(img, 300, null, 2);

                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                //check size of the returned image
                service.createImage(data).then(
                    function(image) {
                        expect(image).to.be.not.null;
                        expect(image.width).to.be.equal(300);
                        done();
                    },
                    function() {
                        expect(true).to.be.false;
                        done();
                    }
                );
                setTimeout(function() {
                    rootScope.$digest();
                },500);
            };

            img.src = 'fixture/img.jpg';
        });

        it('should return a base64 image with specific height and width', function(done) {
            var img = new Image();
            img.onload = function() {
                var data = service.resizeImageWidthHeight(img, 300, 300, 2);

                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                //check size of the returned image
                service.createImage(data).then(
                    function(image) {
                        expect(image).to.be.not.null;
                        expect(image.width).to.be.equal(300);
                        expect(image.height).to.be.equal(300);
                        done();
                    },
                    function() {
                        expect(true).to.be.false;
                        done();
                    }
                );
                setTimeout(function() {
                    rootScope.$digest();
                },500);
            };

            img.src = 'fixture/img.jpg';
        });
    });

    describe('- resizeImageBySize -', function() {
        it('should return a base64 img with a lower size than specified in the option', function(done) {
            var img = new Image();
            img.onload = function() {
                //When i wrote this test, the test image = 8.3Ko
                var data = service.resizeImageBySize(img, 5000);

                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                //check the size of the returned image
                expect(Math.round(data.length - 'data:image/jpeg;base64,'.length)*3/4).to.be.below(5000);
                done();
            };

            img.src = 'fixture/img.jpg';
        });
        it('should return null when no image is specified', function() {
            var data = service.resizeImageBySize();
            expect(data).to.be.null;
        });
    });

    describe('- resizeImage -', function() {
        it('should return nothing when there is missing image', function(done){
            service.resizeImage(null, {} ,function(err, data) {
                expect(err).to.be.not.null;
                expect(data).to.be.null;
                done();
            });
        });
        it('should return nothing when there is missing options', function(done){
            service.resizeImage('fixture/img.jpg', null ,function(err, data) {
                expect(err).to.be.not.null;
                expect(data).to.be.null;
                done();
            });
        });

        it('should return a base64 img with no error when no specific option is specified', function(done) {

            service.resizeImage('fixture/img.jpg', {} ,function(err, data) {
                expect(err).to.be.null;
                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                done();
            });

            setTimeout(function() {
                    rootScope.$digest();
                    setTimeout(function() {
                        rootScope.$digest();
                    },500);
                },500);
        });

        it('should return a base64 img according to the size given in octet', function(done) {

            service.resizeImage('fixture/img.jpg', {size: 5000, sizeScale: 'o'} ,function(err, data) {
                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                //check the size of the returned image
                expect(Math.round(data.length - 'data:image/jpeg;base64,'.length)*3/4).to.be.below(5000);
                done();
            });

            setTimeout(function() {
                    rootScope.$digest();
                    setTimeout(function() {
                        rootScope.$digest();
                    },500);
                },500);
        });

        it('should return a base64 img according to the size given in Ko', function(done) {
            var sizeInKo = 5000 / 1024;

            service.resizeImage('fixture/img.jpg', {size: sizeInKo, sizeScale: 'ko'} ,function(err, data) {
                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                //check the size of the returned image
                expect(Math.round(data.length - 'data:image/jpeg;base64,'.length)*3/4).to.be.below(5000);
                done();
            });

            setTimeout(function() {
                    rootScope.$digest();
                    setTimeout(function() {
                        rootScope.$digest();
                    },500);
                },500);
        });

        it('should return a base64 img according to the size given in Mo', function(done) {
            var sizeInMo = 5000 / (1024*1024);

            service.resizeImage('fixture/img.jpg', {size: sizeInMo, sizeScale: 'mo'} ,function(err, data) {
                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                //check the size of the returned image
                expect(Math.round(data.length - 'data:image/jpeg;base64,'.length)*3/4).to.be.below(5000);
                done();
            });

            setTimeout(function() {
                    rootScope.$digest();
                    setTimeout(function() {
                        rootScope.$digest();
                    },500);
                },500);
        });

        it('should return a base64 img according to the size given in Go', function(done) {
            var sizeInGo = 5000 / (1024*1024*1024);

            service.resizeImage('fixture/img.jpg', {size: sizeInGo, sizeScale: 'go'} ,function(err, data) {
                expect(data).to.be.not.null;
                expect(data).to.contain('data:image/jpeg;base64');
                //check the size of the returned image
                expect(Math.round(data.length - 'data:image/jpeg;base64,'.length)*3/4).to.be.below(5000);
                done();
            });

            setTimeout(function() {
                    rootScope.$digest();
                    setTimeout(function() {
                        rootScope.$digest();
                    },500);
                },500);
        });
    });
});
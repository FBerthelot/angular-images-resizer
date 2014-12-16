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
               expect(data.indexOf('data:image/jpeg;base64')).to.be.greaterThan(-1);
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
               expect(data.indexOf('data:image/jpeg;base64')).to.be.greaterThan(-1);
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
                expect(data.indexOf('data:image/jpeg;base64')).to.be.greaterThan(-1);
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
                expect(data.indexOf('data:image/jpeg;base64')).to.be.greaterThan(-1);
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

    describe('- resizeImage -', function() {
        it('should return a base64 img with no error', function() {
            var src = 'fixture/img.jpg';

            service.resizeImage(src, {} ,function(err, data){
                expect(err).to.be.null;
                expect(data).to.be.not.null;
                expect(data.indexOf('data:image/jpeg;base64')).to.be.greaterThan(-1);
            });
        });
    });
});
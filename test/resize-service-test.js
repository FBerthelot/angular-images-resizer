/**
 * Created by berthelot on 05/11/14.
 */
'use strict';

describe('[resize] resize-service', function() {
    var service, rootScope;

    beforeEach(module('resize'));
    beforeEach(inject(function($injector, $rootScope) {
        service = $injector.get('resizeService');
        rootScope = $rootScope;
    }));

    describe('halfSize', function() {
        it('should return canvas half sized', function() {
            var canvas = document.createElement('canvas');
            canvas.width = 1000;
            canvas.height = 1000;
            canvas = service.halfSize(canvas);
            expect(canvas.width).to.equal(500);
            expect(canvas.width).to.equal(500);
            canvas = service.halfSize(canvas);
            expect(canvas.width).to.equal(250);
            expect(canvas.width).to.equal(250);
        });
    });

    describe('resize', function() {
       it('should return a base64 image with an jpg image in entry', function(done) {
           var img = new Image();
           img.onload = function() {
               var data = service.resize(img);

               expect(data).to.be.not.null;
               expect(data.indexOf('data:image/jpeg;base64')).to.be.greaterThan(-1);

               done();
           };

           img.src = 'fixture/img.jpg';
       });
    });

    describe('createImage', function() {
        it('should return a JS image', function(done) {
            service.createImage('fixture/img.jpg').then(
                function(image) {
                    expect(image).to.be.not.null;
                    done();
                },
                function(err) {
                    expect(err).to.be.null;
                    done();
                }
            );

            setTimeout(function() {
                rootScope.$digest();
            },150);
        });
    });

    describe('startResize', function() {
        it('should return a base64 img with no error', function(done) {
            var src = 'fixture/img.jpg';

            service.startResize(src, function(err, data){
                expect(err).to.be.null;
                expect(data).to.be.not.null;
                expect(data.indexOf('data:image/jpeg;base64')).to.be.greaterThan(-1);
                done();
            });

            setTimeout(function() {
                rootScope.$digest();
            },150);
        });
    });
});
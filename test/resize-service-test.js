/**
 * Created by berthelot on 05/11/14.
 */
'use strict';

describe('[images-resizer] resize-service', function() {
    var service, rootScope;

    beforeEach(module('images-resizer'));
    beforeEach(inject(function($injector, $rootScope) {
        service = $injector.get('resizeService');
        rootScope = $rootScope;
    }));

    describe('resizeImageWidthHeight', function() {
       it('should return a base64 image with an jpg image in entry', function(done) {
           var img = new Image();
           img.onload = function() {
               var data = service.resizeImageWidthHeight(img);

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

    describe('resizeByHeight', function() {
        it('should return a base64 img with no error', function(done) {
            var src = 'fixture/img.jpg';

            service.resizeByHeight(src, 300, function(err, data){
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
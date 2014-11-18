/**
 * Created by berthel on 18/11/14.
 */
'use strict';

describe('[resize] resizeLocalPic-service', function() {
    var service;

    beforeEach(module('resize'));
    beforeEach(inject(function($injector) {
        service = $injector.get('readLocalPicService');
    }));

    describe('readFileInput', function() {
        it('should return an encoded img', function() {
            //Creation of a imput file in the DOM
            var input = document.createElement('input');
            input.type = 'file';
            input.files = 'fixture/img.jpg';

            service.readFileInput(input).then(
                function(image){
                    expect(image).to.be.not.null;
                    expect(image.indexOf('data:image/jpeg;base64')).to.be.isGreaterThanOrEqualTo(0);
                },
                function(err) {
                    expect(err).to.be.null;
                });
        });
    });

});
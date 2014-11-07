/**
 * Created by berthelot on 05/11/14.
 */
'use strict';

window.mocha.setup({
    timeout: 5000
});

describe('[resize] resize-service', function() {
    var service;
    beforeEach(module('resize'));

    beforeEach(inject(function($injector) {
        service = $injector.get('resizeService');
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
});
/**
 * Created by berthel on 18/11/14.
 */
'use strict';

describe('[images-resizer][resizeLocalPic-service]', function() {
    var service, rootScope;

    beforeEach(module('images-resizer'));
    beforeEach(inject(function($injector, $rootScope) {
        service = $injector.get('readLocalPicService');
        rootScope = $rootScope;
    }));

    afterEach(function () {
        rootScope.$apply();
    });

    describe('- readFileInput -', function() {
        it('should return an encoded img', function() {
            //If there is a way to simulate file selection i will take it !
        });
    });

});
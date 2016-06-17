describe('HomePageCtrl', function() {

    var HomePageCtrl, $controller, scope, $q, deferred, $rootScope,
        $httpBackend, testResponse;

    beforeEach(module('hfc'));

    beforeEach(
        inject(function(_$controller_, _$q_, _$rootScope_, _$httpBackend_) {
            $controller = _$controller_;
            $q = _$q_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
        })
    );

    beforeEach(function() {

        scope = {};
        var testResponse = { data: 'testData' };
        spyOn(window, 'alert');

        HomePageCtrl = $controller('HomePageCtrl', {
            $scope: scope,
        });
    });

    describe('initialise', function() {
        it('should setup cottages on successfully resolved promise returned from $http', function() {
            $httpBackend.expect('GET', '/cottageDates')
                .respond(200, testResponse);
            $httpBackend.expect('GET', '/cottages')
                .respond(200, testResponse);
            $httpBackend.flush();
            expect(scope.data.cottageDates).toEqual(testResponse);
            expect(scope.data.cottages).toEqual(testResponse);
        });
        it('should call window.alert with a sensible warning if $http rejects returned promise', function() {
            $httpBackend.expect('GET', '/cottageDates')
                .respond(500, testResponse);
            $httpBackend.expect('GET', '/cottages')
                .respond(500, testResponse);
            $httpBackend.flush();
            expect(window.alert).toHaveBeenCalledWith('couldn\'t get cottageDates: ' + testResponse);
        });
    });

    describe('addCottage', function() {
        var cottage = {};
        beforeEach(function() {
            $httpBackend.expect('GET', '/cottageDates').respond(200);
            $httpBackend.expect('GET', '/cottages').respond(200);
            spyOn(scope, 'updatePage');
            scope.addCottage(cottage);
        });
        it('should set cottage.reserved to false', function() {
            expect(cottage.reserved).toBe(false);
        });
        it('should call updatePage if $http call is succesful', function() {
            $httpBackend.expect('POST', '/cottages').respond(200);
            $httpBackend.flush();
            expect(scope.updatePage).toHaveBeenCalled();
        });
        it('should call window.alert with sensible argument if $http call is successful', function() {
            $httpBackend.expect('POST', '/cottages').respond(200);
            $httpBackend.flush();
            expect(window.alert).toHaveBeenCalledWith('cottage added');
        });
        it('should call window.alert with sensible argument if $http call is unsuccessful', function() {
            $httpBackend.expect('POST', '/cottages').respond(500, 'testReason');
            $httpBackend.flush();
            expect(window.alert).toHaveBeenCalledWith('couldn\'t add cottage: ' + 'testReason');
        });
    });

    describe('addCottageDate', function() {
        var cottageDate = { cottages: [{ name: 'testName', reserved: true, blah: 'blah' }, { name: 'testName2', reserved: true, blah: 'blah' }] };
        var formattedCottageDate = { cottages: [{ name: 'testName', reserved: true }, { name: 'testName2', reserved: true }] };
        beforeEach(function() {
            $httpBackend.expect('GET', '/cottageDates').respond(200);
            $httpBackend.expect('GET', '/cottages').respond(200);
            spyOn(scope, 'updatePage');
            scope.addCottageDate(cottageDate);
        });
        it('should make properly formatted POST request with properly formatted data', function() {
            $httpBackend.expect('POST', '/cottageDates', formattedCottageDate).respond({});
            $httpBackend.flush();
        });
        it('should call updatePage if $http call is successful', function() {
            $httpBackend.expect('POST', '/cottageDates').respond(200);
            $httpBackend.flush();
            expect(scope.updatePage).toHaveBeenCalled();
        });
        it('should call window.alert with a sensible argument if $http call is unsuccessful', function() {
            $httpBackend.expect('POST', '/cottageDates').respond(500, 'blah');
            $httpBackend.flush();
            expect(window.alert).toHaveBeenCalledWith('couldn\'t add cottage date: ' + 'blah');
        });
    });

    describe('getCottageDateByDate', function() {
        var date = new Date().getTime();
        beforeEach(function() {
            $httpBackend.expect('GET', '/cottageDates').respond(200);
            $httpBackend.expect('GET', '/cottages').respond(200);
            spyOn(scope, 'updatePage');
            scope.getCottageDateByDate(date);
        });
        it('should make a properly formatted GET request', function() {
            $httpBackend.expect('GET', '/cottageDates?date=' + date).respond([]);
            $httpBackend.flush();
        });
        it('should set $scope.data.cottageDate correctly if $http call is successful', function() {
            $httpBackend.expect('GET', '/cottageDates?date=' + date).respond(200, ['one', 'two']);
            $httpBackend.flush();
            expect(scope.data.cottageDate).toEqual('one');
        });
    });
});

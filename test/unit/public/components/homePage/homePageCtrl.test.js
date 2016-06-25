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
        var formattedCottageDate = { cottages: [{ name: 'testName', reserved: false }, { name: 'testName2', reserved: false }] };
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
            $httpBackend.expect('POST', '/cottageDates').respond(200, 'cottageDate');
            $httpBackend.flush();
            expect(scope.updatePage).toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledWith('cottage date added: ' + cottageDate);  
        });
        it('should call window.alert with a sensible argument if $http call is unsuccessful', function() {
            $httpBackend.expect('POST', '/cottageDates').respond(500, 'blah');
            $httpBackend.flush();
            expect(window.alert).toHaveBeenCalledWith('couldn\'t add cottage date: ' + 'blah');
        });
    });

    describe('getCottageDateByDate', function() {
        var date = new Date(2016, 11, 4);
        beforeEach(function() {
            $httpBackend.expect('GET', '/cottageDates').respond(200);
            $httpBackend.expect('GET', '/cottages').respond(200);
            spyOn(scope, 'updatePage');
            scope.getCottageDateByDate(date);
        });
        it('should make a properly formatted GET request', function() {
            $httpBackend.expect('GET', '/cottageDates?date=' + 2016 - 06 - 19).respond([]);
            $httpBackend.flush();
        });
        it('should set $scope.data.cottageDate correctly if $http call is successful', function() {
            $httpBackend.expect('GET', '/cottageDates?date=' + 2016 - 06 - 19).respond(200, ['one', 'two']);
            $httpBackend.flush();
            expect(scope.data.cottageDate).toEqual(['one', 'two']);
        });
        it('should call window.alert with sensible argument if $http call is unsuccessful', function() {
            $httpBackend.expect('GET', '/cottageDates?date=' + 2016 - 06 - 19).respond(500, 'blah');
            $httpBackend.flush();
            expect(window.alert).toHaveBeenCalledWith('couldn\'t get cottageDates: ' + 'blah');
        });
    });

    describe('updateCottageDateArray', function() {
        it('should add and remove cottages from scope.data.newCottageDate correctly', function() {
            scope.data.newCottageDate.cottages = [];
            scope.updateCottageDateArray('newCottage', true);
            expect(scope.data.newCottageDate.cottages[0]).toEqual('newCottage');
            scope.updateCottageDateArray('newCottage2', true);
            expect(scope.data.newCottageDate.cottages[1]).toEqual('newCottage2');
            scope.updateCottageDateArray('newCottage', false);
            expect(scope.data.newCottageDate.cottages[0]).toEqual('newCottage2');
        });
    });

    describe('updatePage', function() {
        beforeEach(function() {
            $httpBackend.expect('GET', '/cottageDates').respond(200);
            $httpBackend.expect('GET', '/cottages').respond(200);
        });
        it('should make properly formatted GET requests', function() {
            $httpBackend.expect('GET', '/cottageDates').respond(200);
            $httpBackend.expect('GET', '/cottages').respond(200);
            scope.updatePage();
            $httpBackend.flush();
        });
        it('should set scope.data.cottageDates and $scope.data.cottages correctly if $http GET calls are successful', function() {
            $httpBackend.expect('GET', '/cottageDates').respond(200, 'cottageDates');
            $httpBackend.expect('GET', '/cottages').respond(200, 'cottages');
            scope.updatePage();
            $httpBackend.flush();
            expect(scope.data.cottageDates).toEqual('cottageDates');
            expect(scope.data.cottages).toEqual('cottages');
        });
        it('should call window.alert with correct arguments if $http GET requests are unsuccessful', function() {
            $httpBackend.expect('GET', '/cottageDates').respond(500, 'cottageDates');
            $httpBackend.expect('GET', '/cottages').respond(500, 'cottages');
            scope.updatePage();
            $httpBackend.flush();
            expect(window.alert).toHaveBeenCalledWith('couldn\'t get cottageDates: ' + 'cottageDates');
            expect(window.alert).toHaveBeenCalledWith('couldn\'t get cottages: ' + 'cottages');
        });
    });

    describe('reserveCottageByDate', function() {
        var date = new Date(2016, 11, 4);
        beforeEach(function() {
            $httpBackend.expect('GET', '/cottageDates').respond(200);
            $httpBackend.expect('GET', '/cottages').respond(200);
        });
        it('should make properly formatted PUT request', function() {
            $httpBackend.expect('PUT', '/cottageDates?cottageName=Cottage+1&date=2016-12-04').respond(200);
            scope.reserveCottageByDate('Cottage 1', date);
            $httpBackend.flush();
        });
        it('should call window.alert correctly if $http PUT call is successful', function() {
            $httpBackend.expect('PUT', '/cottageDates?cottageName=Cottage+1&date=2016-12-04').respond(200);
            scope.reserveCottageByDate('Cottage 1', date);
            $httpBackend.flush();
            expect(window.alert).toHaveBeenCalledWith('cottage reserved');
        });
        it('should call window.alert correctly if $http PUT call is unsuccessful', function() {
            $httpBackend.expect('PUT', '/cottageDates?cottageName=Cottage+1&date=2016-12-04').respond(500, 'reason');
            scope.reserveCottageByDate('Cottage 1', date);
            $httpBackend.flush();
            expect(window.alert).toHaveBeenCalledWith('couldn\'t reserve cottage: ' + 'reason');
        });

    });
});

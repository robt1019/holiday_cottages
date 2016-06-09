describe('HomePageCtrl', function() {

    var HomePageCtrl, $controller, scope, mockHttp, $q, deferred, $rootScope;

    beforeEach(module('hfc'));

    beforeEach(
        inject(function(_$controller_, _$q_, _$rootScope_) {
            $controller = _$controller_;
            $q = _$q_;
            $rootScope = _$rootScope_;
        })
    );

    beforeEach(function() {
        scope = {};

        mockHttp = function() {
            deferred = $q.defer();
            return deferred.promise;
        };

        HomePageCtrl = $controller('HomePageCtrl', {
            $scope: scope,
            $http: mockHttp
        });
    });

    describe('initialise', function() {
        it('should setup cottages on successfully resolved promise returned from $http', function() {
            var testResponse = {data: [{name: 'cottage1', reserved: false}]};
            deferred.resolve(testResponse);
            $rootScope.$apply();
            expect(scope.cottages).toEqual(testResponse.data);
        });
    });

    describe('getCottagesByDate', function() {
        it('should get all cottage objects not reserved on a specific date', function() {
        });
    });
});

(function() {
    'use strict';
    angular.module('hfc').controller('HomePageCtrl', ['$scope', '$http',
        function($scope, $http) {

            $scope.addCottage = function(cottage) {
                cottage.reserved = false;
                $http({
                    method: 'POST',
                    url: '/cottages',
                    data: cottage
                }).then(function successCallback(response) {
                    window.alert('cottage added');
                    updatePage();
                }, function errorCallback(reason) {
                    window.alert('couldn\'t add cottage: ' + reason.data);
                });
            };

            $scope.addCottageDate = function(cottageDate) {
                $http({
                    method: 'POST',
                    url: '/cottageDates',
                    data: cottageDate
                }).then(function successCallback(response) {
                    updatePage();
                }, function errorCallback(reason) {
                    window.alert('couldn\'t add cottage date: ' + reason.data);
                });
            };

            $scope.getCottageDateByDate = function(date) {
                $http({
                    method: 'GET',
                    url: 'cottageDates/',
                    params: { date: date },
                }).then(
                    function successCallback(response) {
                        $scope.data.cottageDate = response.data;
                    },
                    function errorCallback(reason) {
                        window.alert('couldn\'t get cottageDates: ' + reason.data);
                    });
            };

            $scope.addRemoveCottage = function(cottageId, index, cottageShouldBeAdded) {
                if (cottageShouldBeAdded) {
                    $scope.data.newCottageDate.cottages.splice(index, 0, cottageId);
                } else {
                    $scope.data.newCottageDate.cottages.splice(index, 1);
                }
            };

            function updatePage() {
                $http({
                    method: 'GET',
                    url: '/cottageDates'
                }).then(function successCallback(response) {
                    $scope.data.cottageDates = response.data;
                }, function errorCallback(reason) {
                    window.alert('couldn\'t get cottageDates: ' + reason.data);
                });
                $http({
                    method: 'GET',
                    url: '/cottages'
                }).then(function successCallback(response) {
                    $scope.data.cottages = response.data;
                }, function errorCallback(reason) {
                    window.alert('couldn\'t get cottages: ' + reason.data);
                });
            }

            function initialise() {
                $scope.data = {
                    cottageReservation: {
                        date: new Date()
                    },
                    newCottageDate: {
                        date: new Date(),
                        cottages: []
                    }
                };
                updatePage();
            }

            initialise();
        }
    ]);
})();

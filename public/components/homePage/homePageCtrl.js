(function() {
    'use strict';
    angular.module('hfc').controller('HomePageCtrl', ['$scope', '$http', '$filter',
        function($scope, $http, $filter) {

            $scope.addCottage = function(cottage) {
                $http({
                    method: 'POST',
                    url: '/cottages',
                    data: cottage
                }).then(
                    function successCallback(response) {
                        window.alert('cottage added');
                        $scope.updatePage();
                    },
                    function errorCallback(reason) {
                        window.alert('couldn\'t add cottage: ' + reason.data);
                    });
            };

            $scope.addCottageDate = function(cottageDate) {
                cottageDate._id = $filter('date')(cottageDate._id, 'yyyy-MM-dd');
                for (var i = 0; i < cottageDate.cottages.length; i++) {
                    cottageDate.cottages.splice(i, 1, {
                        name: cottageDate.cottages[i].name,
                        reserved: false
                    });
                }
                $http({
                    method: 'POST',
                    url: '/cottageDates',
                    data: cottageDate
                }).then(
                    function successCallback(response) {
                        window.alert('cottage date added: ' + cottageDate);
                        $scope.updatePage();
                    },
                    function errorCallback(reason) {
                        window.alert('couldn\'t add cottage date: ' + reason.data);
                    });
            };

            $scope.getCottageDateByDate = function(date) {
                $http({
                    method: 'GET',
                    url: '/cottageDates',
                    params: { date: $filter('date')(date, 'yyyy-MM-dd') },
                }).then(
                    function successCallback(response) {
                        $scope.data.cottageDate = response.data;
                    },
                    function errorCallback(reason) {
                        window.alert('couldn\'t get cottageDates: ' + reason.data);
                    });
            };

            function removeCottage(cottage, cottages) {
                for (var i = 0; i < cottages.length; i++) {
                    if (cottages[i] === cottage) {
                        cottages.splice(i, 1);
                    }
                }
            }

            $scope.updateCottageDateArray = function(cottage, cottageShouldBeAdded) {
                if (cottageShouldBeAdded) {
                    $scope.data.newCottageDate.cottages.push(cottage);
                } else {
                    removeCottage(cottage, $scope.data.newCottageDate.cottages);
                }
            };

            $scope.updatePage = function() {
                $http({
                    method: 'GET',
                    url: '/cottageDates'
                }).then(
                    function successCallback(response) {
                        $scope.data.cottageDates = response.data;
                    },
                    function errorCallback(reason) {
                        window.alert('couldn\'t get cottageDates: ' + reason.data);
                    });
                $http({
                    method: 'GET',
                    url: '/cottages'
                }).then(
                    function successCallback(response) {
                        $scope.data.cottages = response.data;
                    },
                    function errorCallback(reason) {
                        window.alert('couldn\'t get cottages: ' + reason.data);
                    });
            };

            $scope.reserveCottageByDate = function(cottageName, date) {
                $http({
                    method: 'PUT',
                    url: '/cottageDates',
                    params: {
                        date: $filter('date')(date, 'yyyy-MM-dd'),
                        cottageName: cottageName
                    }
                }).then(
                    function successCallback(response) {
                        window.alert('cottage reserved');
                        $scope.updatePage();
                    },
                    function errorCallback(reason) {
                        window.alert('couldn\'t reserve cottage: ' + reason.data);
                    });
            };

            function initialise() {
                $scope.data = {
                    cottageDate: {
                        _id: new Date(),
                        cottages: []
                    },
                    newCottageDate: {
                        _id: new Date(),
                        cottages: []
                    }
                };
                $scope.updatePage();
            }

            initialise();
        }
    ]);
})();

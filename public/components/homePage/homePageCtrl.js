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
                    updateCottages();
                }, function errorCallback(reason) {
                    window.alert('couldn\'t add cottage: ' + reason);
                });
            };

            $scope.getCottagesByDate = function(date) {
                $http({
                    method: 'GET',
                    url: '/:date/cottages'
                }).then(
                    function successCallback(response) {
                        $scope.cottages = response.data;
                    },
                    function errorCallback(reason) {
                        window.alert('couldn\'t get cottages: ' + reason);
                    });
            };

            function updateCottages() {
                $http({
                    method: 'GET',
                    url: '/cottages'
                }).then(function successCallback(response) {
                    $scope.cottages = response.data;
                }, function errorCallback(reason) {
                    window.alert('couldn\'t get cottages: ' + reason);
                });
            }

            function initialise() {
                updateCottages();
            }

            initialise();
        }
    ]);
})();

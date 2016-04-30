(function(){
    var app = angular.module('starter', []);

    app.directive('map', function() {
        return {
            restrict: 'E',
            templateUrl: '../templates/map.html',
            controller: 'mapCtrl'
        }
    });

    app.controller('mapCtrl', function ($scope, $state) {
        $scope.hello = 'Hello World';
        console.log('hi');
    });
})();
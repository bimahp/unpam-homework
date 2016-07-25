'use strict';

angular.module('myApp.hotel', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/hotel', {
    templateUrl: 'hotel/hotel.html',
    controller: 'HotelCtrl'
  });
}])

.controller('HotelCtrl', [function() {

}]);
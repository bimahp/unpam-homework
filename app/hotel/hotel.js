'use strict';

angular.module('myApp.hotel', ['ngRoute', 'ngMaterial', 'md-steppers'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/hotel', {
    templateUrl: 'hotel/hotel.html',
    controller: 'HotelCtrl'
  });
}])

.controller('HotelCtrl', ['$scope', function(sc) {
	sc.customer
	sc.room
	sc.roomTypes = ['Standard', 'Superior', 'Deluxe', 'Junior Suite', 'Suite Room', 'Presidential']

	sc.calculate = function() {
		console.log(sc.customer)
	}
}]);
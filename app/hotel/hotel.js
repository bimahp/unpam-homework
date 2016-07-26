'use strict';

angular.module('myApp.hotel', ['ngRoute', 'ngMaterial', 'md-steppers'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/hotel', {
    templateUrl: 'hotel/hotel.html',
    controller: 'HotelController'
  });
}])

.controller('HotelController', ['$scope', function(sc) {
	// Locals
	var presentDate = new Date()

	// Hotel objects
	sc.guest
	sc.room

	// Hotel form's configs
	sc.guestCount = function() {
		return [1,2,3,4,5,6,7,8,9,10]
	}

	sc.roomTypes = function() {
		return ['Standard', 'Superior', 'Deluxe', 'Junior Suite', 'Suite Room', 'Presidential']
	}

	sc.getPresentDate = function() {
		return presentDate
	}

	// Stepper's configs
	sc.selectedStep = 0
	sc.step = { 
		one: { completed: false },
		two: { completed: false }
	}

	// Methods
	sc.calculate = function() {
		sc.selectedStep = 2
		sc.step.one.completed = true
		console.log(sc.guest)
	}

	sc.clear = function() {
		sc.guest = null
		sc.room = null
	}
}]);
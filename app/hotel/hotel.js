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
	sc.rooms = [
		{ 'name': 'Standard', 'capacity': 2, 'price': 300000 },
		{ 'name': 'Superior', 'capacity': 4, 'price': 550000 },
		{ 'name': 'Deluxe', 'capacity': 4, 'price': 600000 },
		{ 'name': 'Junior Suite', 'capacity': 2, 'price': 250000 },
		{ 'name': 'Suite Room', 'capacity': 6, 'price': 1200000 },
		{ 'name': 'Presidential', 'capacity': 8, 'price': 3000000 }
	]

	// Hotel form's configs
	sc.guestCount = function() {
		return [1,2,3,4,5,6,7,8,9,10]
	}

	sc.getRooms = function() {
		return sc.rooms
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
		
		// Calculate
	}

	sc.clear = function() {
		sc.guest = null
		sc.room = null
	}
}]);
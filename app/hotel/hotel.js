'use strict';

angular.module('myApp.hotel', ['ngRoute', 'ngMaterial', 'md-steppers'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/hotel', {
    templateUrl: 'hotel/hotel.html',
    controller: 'HotelController'
  });
}])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
})

.controller('HotelController', ['$scope', function(sc) {
	var self = this
	// Locals
	var presentDate = new Date()

	// Hotel objects
	sc.guest
	sc.price = { 'rent': 0, 'overcharge': 0, 'discount': 0, 'total': 0 }
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
		return [0,1,2,3,4,5,6,7,8,9,10]
	}

	sc.getRooms = function() {
		return sc.rooms
	}

	sc.getPresentDate = function() {
		return presentDate
	}

	sc.getName = function() {
		if(sc.guest) return sc.guest.firstName + " " + sc.guest.lastName
	}

	sc.getRoomName = function() {
		if(sc.guest && sc.guest.room) return sc.guest.room.name
	}

	sc.getRoomCapacity = function() {
		if(sc.guest && sc.guest.room) return sc.guest.room.capacity + " orang"
	}

	sc.getRoomGuest = function() {
		if(!sc.guest || !sc.guest.count) return

		return getTotalGuest() + " orang";
	}

	sc.isDiscounted = function() {
		return sc.price.discount > 0
	}

	sc.getPriceDiscount = function() {
		return sc.price.discount
	}

	sc.getRentDuration = function() {
		if(!sc.guest || !sc.guest.checkIn || !sc.guest.checkOut) return
		return self.getDayDifference(sc.guest.checkOut.getTime(), sc.guest.checkIn.getTime()) + " hari"
	}

	sc.getPriceTotal =function() {
		return sc.price.total
	}

	sc.getPriceRent = function() {
		return sc.price.rent
	}

	sc.getPriceOvercharge = function() {
		return sc.price.overcharge
	}

	sc.isGuestOverlimit = function() {
		if(sc.guest && sc.guest.room) return getTotalGuest() > sc.guest.room.capacity
	}

	sc.getOverGuest = function() {
		return self.overGuest + " orang"
	}

	// Stepper's configs
	sc.selectedStep = 0
	sc.step = { 
		one: { completed: false },
		two: { completed: false }
	}

	// Methods
	self.overGuest = function() {
		if(sc.guest && sc.guest.room) return getTotalGuest() - sc.guest.room.capacity
	}

	var getTotalGuest = function() {
		if(!sc.guest.count) return
		var adult = sc.guest.count.adult ? sc.guest.count.adult : 0
		var child = sc.guest.count.child ? sc.guest.count.child : 0

		return adult + child
	}

	self.getDayDifference = function(endDate, startDate) {
		var timeDiff = Math.abs(endDate - startDate)
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
		return diffDays
	}

	sc.calculate = function() {
		sc.selectedStep = 2
		sc.step.one.completed = true
		
		// Calculate
		sc.price.rent = sc.guest.room.price * self.getDayDifference(sc.guest.checkOut.getTime(), sc.guest.checkIn.getTime())
		sc.price.total += sc.price.rent

		if(sc.isGuestOverlimit()) {
			sc.price.overcharge = self.overGuest() * 25000 + (sc.price.rent * 0.1 * self.overGuest())
			sc.price.total += sc.price.overcharge
		}

		var dayDiffs = self.getDayDifference(sc.guest.checkOut.getTime(), sc.guest.checkIn.getTime())
		if(dayDiffs >= 3) {
			if(sc.isGuestOverlimit()) {
				sc.price.discount = sc.price.total * 0.05
			} else {
				sc.price.discount = sc.price.total * 0.1
			}
		}
		sc.price.total -= sc.price.discount
	}

	sc.clear = function() {
		sc.guest = null
		sc.room = null
	}
}]);
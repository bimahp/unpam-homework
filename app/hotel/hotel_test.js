'use strict';

describe('HotelController', function() {
  beforeEach(module('myApp.hotel'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('sc.calculate (fungsi kalkulasi)', function() {
    it('bisa mengalikan harga kamar dengan jumlah hari', function() {
      var $scope = {};
      var controller = $controller('HotelController', { $scope: $scope });

      // Mock data
      controller.getDayDifference = function(endDate, startDate) { return 2 };
      $scope.guest = { 
        'checkOut': new Date(),
        'checkIn': new Date(),
        'room': { 'price': 300000 } 
      };

      // Run method
      $scope.calculate();

      // Check output
      expect($scope.price.total).toEqual(600000);
    });

    it('dapat menghitung diskon jika menginap 3 hari atau lebih', function() {
      var $scope = {};
      var controller = $controller('HotelController', { $scope: $scope });

      // Mock data
      controller.getDayDifference = function(endDate, startDate) { return 3 };
      $scope.guest = { 
        'checkOut': new Date(),
        'checkIn': new Date(),
        'room': { 'price': 300000 } 
      };

      // Run method
      $scope.calculate();

      // Check output
      expect($scope.price.discount).toBeGreaterThan(0);
    });

    it('dapat memberikan diskon yang lebih kecil jika tamu melewati kapasitas kamar', function() {
      var $scope = {};
      var controller = $controller('HotelController', { $scope: $scope });

      // Mock data
      controller.getDayDifference = function(endDate, startDate) { return 3 };
      controller.overGuest = function() { return 2 };
      $scope.isGuestOverlimit = function() { return true };
      $scope.guest = { 
        'checkOut': new Date(),
        'checkIn': new Date(),
        'room': { 'price': 300000 } 
      };

      // Run method
      $scope.calculate();
      var overLimitDiscount = $scope.price.discount;


      $scope.isGuestOverlimit = function() { return false };
      $scope.calculate();
      var underLimitDiscount = $scope.price.discount;

      // Check output
      expect(overLimitDiscount).toBeLessThan(underLimitDiscount);
    });

    it('dapat menghitung denda jika tamu melebihi kapasitas kamar', function() {
      var $scope = {};
      var controller = $controller('HotelController', { $scope: $scope });

      // Mock data
      controller.getDayDifference = function(endDate, startDate) { return 1 };
      controller.overGuest = function() { return 2 };
      $scope.isGuestOverlimit = function() { return true };
      $scope.guest = { 
        'checkOut': new Date(),
        'checkIn': new Date(),
        'room': { 'price': 300000 } 
      };

      // Run method
      $scope.calculate();

      // Check output
      expect($scope.price.overcharge).toBeGreaterThan(0);
    });
  });
});
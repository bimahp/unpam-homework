'use strict';

describe('HotelController', function() {
  beforeEach(module('myApp.hotel'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('sc.guestCount', function() {
    it('has 10 elements of data', function() {
      var $scope = {};
      var controller = $controller('HotelController', { $scope: $scope });
      expect($scope.guestCount().length).toEqual(10);
    });
  });
});
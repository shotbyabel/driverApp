// IIFE START //
(function() { 
 'use strict';

 angular.module('starter')
 .controller("BookingsCtrl", function($scope, BookingsService) {

  $scope.today = [];
  $scope.test = 'scope test';
  $scope.dailyPassengers = 0;

  // $scope.today = BookingsService;
  // $scope.today = {
  //   'bookings':BookingsService.bookings
    // 'bookings': []
  // };
    //AFTER $http service we call our function in the Ctrl?
    BookingsService.getBookings().then(function success (data) {
      console.log("Success!");
      console.log($scope.test);
      console.log(data);
      if(data){
        $scope.today = BookingsService.bookings;
        $scope.dailyPassengers = BookingsService.bookings.length;
        
      }

    }, function error (data) {
      console.log("Error!")
    });

    $scope.startTrip = function() {
      //driverLocationService.startDriverTrip(bookingId, userId);
      var bookingId = event.target.id;
      BookingsService.startTrip(bookingId);
    }

    $scope.endTrip = function() {
    //driverLocationService.stopDriverTrip(bookingId, userId);
      var bookingId = event.target.id;
      BookingsService.endTrip(bookingId);
    }

    //driverLoc by the minute
    
})
 // IIFE START //
})();

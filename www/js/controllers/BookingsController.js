// IIFE START //
(function() {
 'use strict';

 angular.module('starter')
 .controller("BookingsCtrl", function($scope, $stateParams, BookingsService, driverLocationService) {
  console.log($stateParams);

  $scope.today = [];
  $scope.test = 'scope test';
  $scope.dailyPassengers = null;

  // BookingsService.user_id = $stateParams.user_id;
  BookingsService.user_id = '1108';
  // BookingsService.driver_id = $stateParams.driver_id;
  console.log($scope);

  // $scope.today = BookingsService;
  // $scope.today = {
  //   'bookings':BookingsService.bookings
    // 'bookings': []
  // };
    //AFTER $http service we call our function in the Ctrl?
    BookingsService.getBookings().then(function success (data) {
      console.log("Success!");
      console.log($scope);
      console.log(data);
      if(data){
        $scope.today = BookingsService.bookings;
        $scope.dailyPassengers = BookingsService.bookings.length;

      }

    }, function error (data) {
      console.log("Error!")
    });

    $scope.startTrip = function() {
      // console.log(self);
      // var userId = 1108;
      driverLocationService.startDriverTrip(bookingId, BookingsService.user_id);
      var bookingId = event.target.id;
      BookingsService.startTrip(bookingId);
    }

    $scope.endTrip = function() {
      // var userId = 1108;
    driverLocationService.stopDriverTrip(bookingId, BookingsService.user_id);
      var bookingId = event.target.id;
      BookingsService.endTrip(bookingId);
    }

    //driverLoc by the minute

})
 // IIFE START //
})();

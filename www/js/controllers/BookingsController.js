// IIFE START //
(function() {
 'use strict';

 angular.module('starter')
 .controller("BookingsCtrl", function($scope, BookingsService) {

  $scope.today = [];
  $scope.test = 'jad';

  // BookingsService.getBookings();
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
      }
  //   $scope.today = BookingsService.bookings;
}, function error (data) {
  console.log("Error!")
});

    $scope.startTrip = function() {
      var bookingId = event.target.id;
      BookingsService.startTrip(bookingId);
    }

    $scope.endTrip = function() {
      var bookingId = event.target.id;
      BookingsService.endTrip(bookingId);
    }

  });
 // IIFE START //
})();

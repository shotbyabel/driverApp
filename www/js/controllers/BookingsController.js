// IIFE START //
(function() {
 'use strict';

 angular.module('starter')
 .controller("BookingsCtrl", function($scope, $ionicSideMenuDelegate, $stateParams, $state, $ionicModal, $q, $timeout,
                                      BookingsService, tripService, UserService, $filter) {

  $ionicSideMenuDelegate.canDragContent(true);


  $scope.bookings = [];
  // $scope.cars = [];
  $scope.test = 'scope test';
  $scope.dailyPassengers = null;
  $scope.combo = [];
//To be used when we want to do something on the page load
//Example get data from server, etc..
  $scope.$on('$ionicView.enter', onLoad());


  function onLoad() {

  BookingsService.driver_id = UserService.driver.id;

  BookingsService.getBookings().then(function success (data) {
    console.log("Success!");
    console.log(data);
    if(data){
      $scope.user = UserService.user;

      $scope.bookingsData = BookingsService.bookingsData;
        var customers = BookingsService.bookingsCustomers;
        var cars = BookingsService.bookingsCars;
        var options = BookingsService.bookingsOptions;
      $scope.bookingsData.forEach(function(booking, index){
        var complete = [booking, customers[index], cars[index], options[index]];
        $scope.combo.push(complete);
      })
      $scope.bookings = $scope.combo;
        BookingsService.bookings = $scope.bookings;
      $scope.dailyPassengers = $scope.bookings.length;
      console.log($scope.bookings);
      // console.log($scope.cars[0][0].brand + " " + $scope.cars[0][0].model);
      }

    }, function error (data) {
      console.log("Error!")
    });
  };


//////////////////////////
///GET DAY OF THE WEEK///
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
$scope.date = new Date;

$scope.dayofWeek = days[$scope.date.getDay()];
$scope.month = months[$scope.date.getMonth()];

  // Triggered in the login modal to close it
  $scope.closetripInfo = function() {
    $scope.modal.hide();
  };

  // Open current-trip view with trip details
  $scope.tripInfo = function() {
      $scope.bookingIndex = event.target.id;
      BookingsService.currentBooking = $scope.bookings[$scope.bookingIndex][0];
      BookingsService.currentCustomer = $scope.customers[$scope.bookingIndex];
      BookingsService.currentBookingOptions = BookingsService.bookingsOptions[$scope.bookingIndex];
      BookingsService.currentBookingCars = BookingsService.bookingsCars[$scope.bookingIndex];
      $state.go('app.current-trip');
      // UserService.isDriver <--
  };
});
 // IIFE START //
})();

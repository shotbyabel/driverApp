// IIFE START //
(function() {
 'use strict';

 angular.module('starter')
 .controller("BookingsCtrl", function($scope, $ionicSideMenuDelegate, $stateParams, $state, $ionicModal, $q, $timeout,
                                      BookingsService, driverLocationService, UserService) {

  $ionicSideMenuDelegate.canDragContent(true);
  console.log($scope);
  $scope.today = [];
  $scope.test = 'scope test';
  $scope.dailyPassengers = null;
//To be used when we want to do something on the page load
//Example get data from server, etc..
  $scope.$on('$ionicView.enter', function(){

  // console.log('here');
  console.log(UserService);
  BookingsService.driver_id = UserService.driver.id;
  BookingsService.getBookings().then(function success (data) {
    console.log("Success!");
    console.log(data);
    if(data){
      $scope.today = BookingsService.bookings;
      $scope.customers = BookingsService.bookingsCustomers;
      $scope.user = UserService.user
      // console.log($scope.customers);
      $scope.dailyPassengers = BookingsService.bookings.length;
      }

    }, function error (data) {
      console.log("Error!")
    });
});

//////////////////////////
///GET DAY OF THE WEEK///
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var today = new Date;

$scope.dayofWeek = days[today.getDay()];
 //////////////////////////////////
 ///START trip-details modal
    $ionicModal.fromTemplateUrl('templates/trip-details.html', {
    scope: $scope
  }).then(function(modal) {

    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closetripInfo = function() {
    $scope.modal.hide();
  };

  // Open the trip-details modal
  $scope.tripInfo = function() {
      $scope.bookingIndex = event.target.id;
      BookingsService.currentBooking = $scope.today[$scope.bookingIndex];
      BookingsService.currentCustomer = $scope.customers[$scope.bookingIndex];
      $state.go('app.current-trip');
  };

 // IIFE START //
})();

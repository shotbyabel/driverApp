// IIFE START //
(function() {
 'use strict';

 angular.module('starter')
 .controller("BookingsCtrl", function($scope, $ionicSideMenuDelegate, $stateParams, $state, $ionicModal, $q, $timeout,
                                      BookingsService, driverLocationService, UserService) {

  $ionicSideMenuDelegate.canDragContent(true);

  $scope.today = [];
  $scope.test = 'scope test';
  $scope.dailyPassengers = null;
//To be used when we want to do something on the page load
//Example get data from server, etc..
  $scope.$on('$ionicView.enter', function(){

  console.log('here');
  console.log(UserService.user);
  BookingsService.driver_id = UserService.user.driver_id;
  BookingsService.getBookings().then(function success (data) {
    console.log("Success!");
    console.log(data);
    if(data){
      $scope.today = BookingsService.bookings;
      $scope.customers = BookingsService.bookingsCustomers;
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
      $scope.currentBooking = $scope.today[$scope.bookingIndex];
      $scope.currentCustomer = $scope.customers[$scope.bookingIndex];
      $scope.modal.show($scope);
  };

//////////////////////////////////////////////////////////////
///SWIPE-RIGHT from trip-details TO current-trip .state//////
$scope.onSwipeRight = function() {
  $scope.closetripInfo();
  $scope.startTrip();
  console.log($scope.currentBooking.id);
  $state.go('app.current-trip', {booking_id: $scope.currentBooking.id});

}
////////////////////////////////////
/// START & END driver trips

    $scope.startTrip = function() {
      //updated w/user_id
      driverLocationService.startDriverTrip($scope.currentBooking.id, UserService.user.id);
      BookingsService.startTrip($scope.currentBooking.id);
    }

    $scope.endTrip = function() {
      $scope.booking_id = $stateParams.booking_id
      //updated w/user_id
      driverLocationService.stopDriverTrip($scope.booking_id, UserService.user.id);
      BookingsService.endTrip($scope.booking_id);
    }

/////////////////////////////////
////Logout Pop-up    
  $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'EXIT?',
       template: 'Are you sure you want to Log out?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('Direct to Login state-OUT');
       } else {
         console.log('Return to previous screen,menu?');
       }
     });
   };




})
 // IIFE START //
})();

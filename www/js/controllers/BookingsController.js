// IIFE START //
(function() {
 'use strict';

 angular.module('starter')
 .controller("BookingsCtrl", function($scope, $stateParams, $state, $ionicModal, BookingsService, driverLocationService) {
  // console.log($stateParams);

  $scope.today = [];
  $scope.test = 'scope test';
  $scope.dailyPassengers = null;
  // $scope.

  // BookingsService.user_id = $stateParams.user_id;
  BookingsService.user_id = '1236';
  // BookingsService.customer_id = '268';
  // BookingsService.driver_id = $stateParams.driver_id;

  // $scope.today = BookingsService;
  // $scope.today = {
  //   'bookings':BookingsService.bookings
    // 'bookings': []
  // };
////////////////////////////////////////////  
///getDAY of Week 
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
      $scope.bookingId = event.target.id;
          console.log($scope.bookingId);
    $scope.modal.show();
  };
 /// finish trip-details modal
//////////////////////////////////////////

//////////////////////////////////////////////////////////////
///SWIPE-RIGHT from trip-details TO current-trip .state//////

$scope.onSwipeRight = function() {
//function chaining NEEDS TO BE REFACTOR- errors  
  $scope.closetripInfo(); 
  $state.go('app.current-trip').closetripInfo();
}
////////////////////////////////////////////////////////////
//AFTER $http service we call our function in the Ctrl?
  BookingsService.getBookings().then(function success (data) {
    console.log("Success!");
    console.log(data);
    if(data){
      $scope.today = BookingsService.bookings;
      $scope.dailyPassengers = BookingsService.bookings.length;            

      }

    }, function error (data) {
      console.log("Error!")
    });

    BookingsService.getNames().then(function success (data) {
      console.log(data);
      if(data) {
        $scope.customerNames = BookingsService.customerNames
      }
    })

   
        

    $scope.startTrip = function() {
      console.log($scope);
      // var userId = 1108;
      driverLocationService.startDriverTrip($scope.bookingId, BookingsService.user_id);
      BookingsService.startTrip($scope.bookingId);
    }

    $scope.endTrip = function() {
      // var userId = 1108;
    driverLocationService.stopDriverTrip($scope.bookingId, BookingsService.user_id);
      BookingsService.endTrip($scope.bookingId);
    }

    //driverLoc by the minute

})
 // IIFE START //
})();

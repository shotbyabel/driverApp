// IIFE START //
(function() {
 'use strict';

 angular.module('starter')

.filter('customDateFilter', function() {
  return function(input) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'];
    var weekdays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    var inputDate = new Date(input);

    return weekdays[inputDate.getDay()] + ", " + months[inputDate.getMonth()] + ", " + inputDate.getDate();
  };
})

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

      BookingsService.getBookings().then(function success(data) {
        console.log("Success!");
        console.log(data);
        if (data) {
          $scope.user = UserService.user;
          $scope.googleCalendarEvents = BookingsService.googleCalendarEvents;//added

          $scope.bookingsData = BookingsService.bookingsData;
          // console.log($scope.bookingsData);//new details shows up with the array of objects
          var customers = BookingsService.bookingsCustomers;
          var cars = BookingsService.bookingsCars;
          var options = BookingsService.bookingsOptions;
///////////Before we had an array of arrays holding the different data. 
////This was giving me trouble when I was trying to group bookings by date.
///I saw some example of array of Objects, that have an array. checkout the console.log in line 48
          $scope.bookingsData.forEach(function(booking, index) {
            var complete = {
              customers: customers[index], 
              cars: cars[index], 
              options: options[index]
            };
            booking.details = complete; //*N E W* access data in arrays this way .details
            // console.log(booking.driver_departing_time);
            // console.log(booking.details);//RESULT of new array organization

            $scope.combo.push(booking);
          })

          // $scope.message = {
          //   text: 'hello world!',
          //   time: new Date()
          
          //   };


          $scope.bookings = $scope.combo; //all combined data attached to bookings?
          // BookingsService.bookings = $scope.bookings;
          $scope.dailyPassengers = $scope.bookings.length;
          // console.log($scope.bookings);

        }

      }, function error(data) {
        console.log("Error!")
      });
    };
    ///B E F O R E - array of arrays
    // [
    //   [Booking]
    //   [cars]
    //   [..]
    // ]
    ////// R E F A C T O R - array of objects with arrays
    // [
    //   Booking: {
    //     Booking data.
    //     details: [
    //       [cars],
    //       [optios]
    //     ]
    //   }
    // ]
//////////////////////////
///GET DAY OF THE WEEK///
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
$scope.date = new Date;

$scope.dayofWeek = days[$scope.date.getDay()];
$scope.month = months[$scope.date.getMonth()];
/////////////////////////////////////////////
//DATES ACCORDION
    // $scope.bookings = [];
    // for (var i = 0; i < $scope.bookings.length; i++) { //number of all bookings NOT "10"
    //   $scope.bookings[i] = {
    //     name: i,
    //     items: []
    //   };
    //   for (var j = 0; j < items.length; j++) { //number of rides of THAT date not 
    //     $scope.bookings[i].items.push(i + '-' + j);
    //   }
    // }
    /*
     * if given group is the selected group, deselect it* else, select the given group
     */
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

///////////////////////////////////////////////
  // Triggered in the login modal to close it
  $scope.closetripInfo = function() {
    $scope.modal.hide();
  };

  // Open current-trip view with trip details
  $scope.tripInfo = function(index) {
    // $scope.bookingIndex = event.target.id;
      BookingsService.currentBooking = $scope.bookings[index];
      BookingsService.currentCustomer = $scope.bookings[index].details.customers[0];//update from new line 41
      BookingsService.currentBookingOptions = $scope.bookings[index].details.options[0];//update from new line 41
      BookingsService.currentBookingCars = $scope.bookings[index].details.cars[0];//update from new line 41
      $state.go('app.current-trip');
      // UserService.isDriver <--
  };
});
 // IIFE START //
})();

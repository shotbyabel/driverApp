// IIFE START //
(function() {
 'use strict';

 angular.module('starter')
 .controller("BookingsCtrl", function($scope, $ionicSideMenuDelegate, $stateParams, $state, $ionicModal, $q, $timeout,
                                      BookingsService, tripService, UserService,) {

  $ionicSideMenuDelegate.canDragContent(true);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////Google Calendar Code//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '800139382072-obdt29gob1vcama4biandhcn1jjq6tok.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/calendar"];

/////////////////** For Testing Purposes */////////////////////
      // var email = 'jaytee.sanchez@gmail.com';//
//////////////////////////////////////////////////////////////

      var email = UserService.email;
      $scope.calendarUrl = "https://calendar.google.com/calendar/embed?src=" + email + "&ctz=America/Los_Angeles";

      /**
       * Check if current user has authorized this application.
       */
      $scope.checkAuth = function() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' ')
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      var handleAuthResult = function(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadCalendarApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
      function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
        var pre = document.getElementById('output');
        var Calendar = document.createElement("iframe");
        Calendar.src = $scope.calendarUrl;
        Calendar.width="100%";
        Calendar.height="350px";
        Calendar.frameborder="0";
        pre.appendChild(Calendar);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
          var events = resp.items;
          appendPre('Upcoming events:');

          if (events.length > 0) {
            for (var i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }

        });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  $scope.today = [];
  // $scope.cars = [];
  $scope.test = 'scope test';
  $scope.dailyPassengers = null;
//To be used when we want to do something on the page load
//Example get data from server, etc..
  $scope.$on('$ionicView.enter', function(){

  BookingsService.driver_id = UserService.driver.id;

  BookingsService.getBookings().then(function success (data) {
    console.log("Success!");
    console.log(data);
    if(data){

      $scope.today = BookingsService.bookings;
      $scope.customers = BookingsService.bookingsCustomers;
      $scope.user = UserService.user;
      $scope.cars = BookingsService.bookingsCars;
      // console.log($scope.cars[0][0].brand + " " + $scope.cars[0][0].model);
      $scope.dailyPassengers = BookingsService.bookings.length;
      }

    }, function error (data) {
      console.log("Error!")
    });
});

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
      BookingsService.currentBooking = $scope.today[$scope.bookingIndex];
      BookingsService.currentCustomer = $scope.customers[$scope.bookingIndex];
      BookingsService.currentBookingOptions = BookingsService.bookingsOptions[$scope.bookingIndex];
      BookingsService.currentBookingCars = BookingsService.bookingsCars[$scope.bookingIndex];
      $state.go('app.current-trip');
      // UserService.isDriver <--
  };
});
 // IIFE START //
})();

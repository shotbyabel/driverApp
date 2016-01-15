(function() {
  "use strict";

  angular.module('starter').controller('BookingsCalendarCtrl',
    function($scope, UserService, BookingsService, $ionicPopup, $filter) {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////Google Calendar Code//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '800139382072-obdt29gob1vcama4biandhcn1jjq6tok.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/calendar"];

      $scope.calEvents = [];

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
        var bookingsButton = document.getElementById('bookings-button');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadCalendarApi();
          bookingsButton.style.display = 'inline';
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
              $scope.calEvents.push(event);
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
      function sortDates(bookings) {
        console.log('sorting...');
        console.log(bookings);
        bookings.sort(function(a, b) {
          if(!a[0] && !b[0]) return( new Date(a.start.date) - new Date(b.start.date));
          if(!a[0] && b[0]) return( new Date(a.start.date) - new Date(b[0].driver_departing_time));
          if(a[0] && b[0]) return( new Date(a[0].driver_departing_time) - new Date(b[0].driver_departing_time));
          if(a[0] && !b[0]) return( new Date(a[0].driver_departing_time) - new Date(b.start.date));
          return;
        })
      }

      $scope.addEvents = function() {
        var addEventsPopup = $ionicPopup.confirm({
          title: "You are about to add your events to the Bookings View,",
          template: "Are you Sure?"
        });

        addEventsPopup.then(function(res) {
          if (res) {
            $scope.calEvents.forEach(function(calEvent) {
              BookingsService.bookings.push(calEvent);
              sortDates(BookingsService.bookings);

            })
            var bookingsButton = document.getElementById('bookings-button');
            bookingsButton.style.display = 'none';
            alert("Success! Check Your Bookings View!")
          }
        })
      }


});
})();

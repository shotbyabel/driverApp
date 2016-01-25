(function() {
  "use strict";

  angular.module('starter').controller('BookingsCalendarCtrl',
    function($scope, UserService, BookingsService) {

      function showBookingDetails(date, jsEvent, view) {
        //Bind the customerName taken from the event to a scope variable to show it in the HTML
        $scope.clickedCustomerName = date.className.customerName;
        $scope.clickedCustomerTest = date.className.departingTime;
      }

      //source code
      $scope.calendarOptions = {
        calendar: {
          editable: true,
          eventClick: showBookingDetails
            // eventRender: $scope.eventRender
        },
      };
      /////////////////////////////////
      //**3**take bookings
      function prepareBookingEvents(bookings, customers) {
        for (var i = 0; i < bookings.length; i++) {
          var bookingDate = new Date(bookings[i].departing_date);
          //**7**
          $scope.bookingEvents.push({ //bookingEvents holds all bookings
            //**8** reference code from docs http://angular-ui.github.io/ui-calendar/
            title: 'Trip',
            //**10** add Date API --dates were not displaying: format fullCallendar understands dates
            start: new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate(),
              bookingDate.getHours(), bookingDate.getMinutes(), bookingDate.getSeconds()),
            //SOURCODE 'className' to pass data in Calendar/Event
            className: {
              customerName: customers[i][0].first_name + " " + customers[i][0].last_name,
              departingTime: "Passenger Pick up Time & Destination"
            }
            
          });
        }
        console.log($scope.bookingEvents); //
      }

      $scope.eventSources = []; //initialize eventSrouces as empty

      //**1**.When you cache the route, controller only gets called once.
      //Use this function to have code run everytime you enter the cached page
      //Example get the User driver ID because maybe if someone other than the main account logged in
      //it would still have that user's id.
      $scope.$on('$ionicView.enter', function() {
        $scope.bookingEvents = []; //**4** initialize to get bookings (prep a bookings event)

        BookingsService.driver_id = UserService.driver.id; //**2**from BookingController.js - Line 20
        BookingsService.getBookings().then(function(response) { //from line 21(returns promise)
          //**9** if
          if (response) { //API call returns true we put in bookings var
            var bookings = BookingsService.bookingsData; //**5** save bookings object
            var customers = BookingsService.bookingsCustomers; //***A** save the customers object
          }
          // console.log(customers); TODO:  
          //call the functions on the bookings we got back
          prepareBookingEvents(bookings, customers); //**6** pass bookings here
          //when done add bookings events to the event sources [] --
          $scope.eventSources.push($scope.bookingEvents); //push to EventSources array
        })
      })
    });
})();



// (function() {
//   "use strict";

//   angular.module('starter').controller('BookingsCalendarCtrl',
//     function($scope, UserService, BookingsService, $ionicPopup, $filter) {

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////Google Calendar Code//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//       // Your Client ID can be retrieved from your project in the Google
//       // Developer Console, https://console.developers.google.com
//       var CLIENT_ID = '800139382072-obdt29gob1vcama4biandhcn1jjq6tok.apps.googleusercontent.com';

//       var SCOPES = ["https://www.googleapis.com/auth/calendar"];

//       $scope.calEvents = [];

// /////////////////** For Testing Purposes */////////////////////
//       // var email = 'jaytee.sanchez@gmail.com';//
// //////////////////////////////////////////////////////////////

//       var email = UserService.email;

//       $scope.calendarUrl = "https://calendar.google.com/calendar/embed?src=" + email + "&ctz=America/Los_Angeles";

//       /**
//        * Check if current user has authorized this application.
//        */
//       $scope.checkAuth = function() {
//         gapi.auth.authorize(
//           {
//             'client_id': CLIENT_ID,
//             'scope': SCOPES.join(' ')
//           }, handleAuthResult);
//       }

//       /**
//        * Handle response from authorization server.
//        *
//        * @param {Object} authResult Authorization result.
//        */
//       var handleAuthResult = function(authResult) {
//         var authorizeDiv = document.getElementById('authorize-div');
//         var bookingsButton = document.getElementById('bookings-button');
//         if (authResult && !authResult.error) {
//           // Hide auth UI, then load client library.
//           authorizeDiv.style.display = 'none';
//           loadCalendarApi();
//           bookingsButton.style.display = 'inline';
//         } else {
//           // Show auth UI, allowing the user to initiate authorization by
//           // clicking authorize button.
//           authorizeDiv.style.display = 'inline';
//         }
//       }

//       /**
//        * Initiate auth flow in response to user clicking authorize button.
//        *
//        * @param {Event} event Button click event.
//        */
//       function handleAuthClick(event) {
//         gapi.auth.authorize(
//           {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
//           handleAuthResult);
//         return false;
//       }

//       /**
//        * Load Google Calendar client library. List upcoming events
//        * once client library is loaded.
//        */
//       function loadCalendarApi() {
//         gapi.client.load('calendar', 'v3', listUpcomingEvents);
//         var pre = document.getElementById('output');
//         var Calendar = document.createElement("iframe");
//         Calendar.src = $scope.calendarUrl;
//         Calendar.width="100%";
//         Calendar.height="350px";
//         Calendar.frameborder="0";
//         pre.appendChild(Calendar);
//       }

//       *
//        * Print the summary and start datetime/date of the next ten events in
//        * the authorized user's calendar. If no events are found an
//        * appropriate message is printed.
       
//       function listUpcomingEvents() {
//         var request = gapi.client.calendar.events.list({
//           'calendarId': 'primary',
//           'timeMin': (new Date()).toISOString(),
//           'showDeleted': false,
//           'singleEvents': true,
//           'maxResults': 10,
//           'orderBy': 'startTime'
//         });

//         request.execute(function(resp) {
//           var events = resp.items;
//           appendPre('Upcoming events:');

//           if (events.length > 0) {
//             for (var i = 0; i < events.length; i++) {
//               var event = events[i];
//               $scope.calEvents.push(event);
//               var when = event.start.dateTime;
//               if (!when) {
//                 when = event.start.date;
//               }
//               appendPre(event.summary + ' (' + when + ')')
//             }
//           } else {
//             appendPre('No upcoming events found.');
//           }

//         });
//       }

//       /**
//        * Append a pre element to the body containing the given message
//        * as its text node.
//        *
//        * @param {string} message Text to be placed in pre element.
//        */
//       function appendPre(message) {
//         var pre = document.getElementById('output');
//         var textContent = document.createTextNode(message + '\n');
//         pre.appendChild(textContent);
//       }
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////J A Y T E E s  F A N C Y  S O R T I N G//////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//       function sortDates(bookings) {
//         console.log('sorting...');
//         console.log(bookings);
//         bookings.sort(function(a, b) {
//           if(!a[0] && !b[0]) return( new Date(a.start.date) - new Date(b.start.date));
//           if(!a[0] && b[0]) return( new Date(a.start.date) - new Date(b[0].driver_departing_time));
//           if(a[0] && b[0]) return( new Date(a[0].driver_departing_time) - new Date(b[0].driver_departing_time));
//           if(a[0] && !b[0]) return( new Date(a[0].driver_departing_time) - new Date(b.start.date));
//           return;
//         })
//       }

//       $scope.addEvents = function() {
//         var addEventsPopup = $ionicPopup.confirm({
//           title: "You are about to add your events to the Bookings View,",
//           template: "Are you Sure?"
//         });

//         addEventsPopup.then(function(res) {
//           if (res) {
//             $scope.calEvents.forEach(function(calEvent) {
//               BookingsService.googleCalendarEvents.push(calEvent);//google cal events Seperated from bookings-can combine later.
//               //added to bookingService.js
//               // sortDates(BookingsService.googleCalendarEvents); //sorting with the OrderBy Angular Filter in Today.html 

//             })
//             var bookingsButton = document.getElementById('bookings-button');
//             bookingsButton.style.display = 'none';
//             alert("Success! Check Your Bookings View!")

//           }
//         })
//       }


// });
// })();

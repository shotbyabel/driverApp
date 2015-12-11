(function() {
  "use strict";

  angular.module('starter').controller('BookingsCalendarCtrl',
    function($scope, UserService, BookingsService) {
  // T O D O ///////////    
  // DATE CLICK EVENT - not working will show booking details
      function showBookingDetails(date, jsEvent, view) {
        alert('yo?');
        alert(date);//pass bookingEvent data here?
      }
      //source code
      $scope.calendarOptions = {
        calendar: {
          editable: true,
          eventClick: showBookingDetails
        },
      };
  /////////////////////////////////
//**3**take bookings 
      function prepareBookingEvents(bookings) {
        for (var i = 0; i < bookings.length; i++) {
          var bookingDate = new Date(bookings[i].departing_date);
          //**7**
          $scope.bookingEvents.push({ //bookingEvents holds all bookings
          //**8** reference code from docs http://angular-ui.github.io/ui-calendar/  
            title: 'Trip',
            //**10** add Date API --dates were not displaying: format fullCallendar understands dates
            start: new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate())
          });
        }
        console.log($scope.bookingEvents);//
      }

      $scope.eventSources = [];//initialize eventSrouces as empty

      //**1**.When you cache the route, controller only gets called once.
      //Use this function to have code run everytime you enter the cached page
      //Example get the User driver ID because maybe if someone other than the main account logged in
      //it would still have that user's id.
      $scope.$on('$ionicView.enter', function() {
        $scope.bookingEvents = [];//**4** initialize to get bookings (prep a bookings event)

        BookingsService.driver_id = UserService.driver.id;//**2**from BookingController.js - Line 20
        BookingsService.getBookings().then(function(response) { //from line 21(returns promise)
          //**9** if 
          if(response){//API call returns true we put in bookings var 
        var bookings = BookingsService.bookings;//**5** save bookings object 
          }
          //call the functions on the bookings we got back
          prepareBookingEvents(bookings);//**6** pass bookings here
        })
        //when done add bookings events to the event sources [] -- 
        $scope.eventSources.push($scope.bookingEvents);//push to EventSources array

      })
    });
})();
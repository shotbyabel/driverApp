// IIFE START //
(function() {
  'use strict';
  angular.module('starter')
    .service("BookingsService", function($http, $q) {

      var self = this;
      self.bookings = [];
      self.bookingsCustomers = [];
      self.googleCalendarEvents = [];//**NEW**
      // adds groupByDateCode to the bookings.//
      // take the driver_departing_time of each booking and transform it into a {date object} 
      // take the date year and date month and date day and add them up together to form a code. 
      function setBookingGroupDate(bookings) {
        //*2*Go through each booking
        for (var i = bookings.length - 1; i >= 0; i--) {
          
          var arr = bookings[i].driver_departing_time.split(/[- :]/);
          var date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
          var dateWithoutHour = new Date(date.getFullYear(), date.getMonth(), date.getDate()); //*4* create same date but w/o the hr to minimize the differences
          var dateCode = dateWithoutHour.getTime(); //Get timeStamps to have same filed for all and same type to be able to order and GROUP
          bookings[i].groupByDateCode = dateCode; //add it back to respective booking[index]
        };
        //Return the bookings
        return bookings;
      }

      //GET FROM ARRAY
      self.getBookings = function() {
        //create 'defer object'
        var deferred = $q.defer();
        // console.log(self)
          //update to .user_id - got rid of getNames function
          // $http.get("http://localhost/apinew/bookings/" + self.driver_id)//LOCAL
        $http.get("http://dev.afourc.ml/apinew/bookings/" + self.driver_id) //DEVELOPMENT
          .success(function success(data) {
            console.log(data); //entire bookings object console log
            
            self.bookingsData = setBookingGroupDate(data[0]); //*1*Calls function on bookings from API to add the field before giving it to the service //first array, bookings
            self.bookingsCustomers = data[1]; //second array the customer info
            self.bookingsOptions = data[2]; // options
            self.bookingsCars = data[3]; //cars

            deferred.resolve(true);
          })
          .error(function error(msg) {
            console.error(msg);
            deferred.reject(false);
          })
        return deferred.promise; //promise has a '.then' functions ->
      }

      //START-END trips//////
      self.startTrip = function(bookingId) {
        //store the id for the trip to be used later..

        var deferred = $q.defer();
        $http.get("http://dev.afourc.ml/apinew/bookings/" + bookingId + "/start_trip")

        .success(function(data) {
            console.log(data);
            deferred.resolve(true);
          })
          .error(function(msg) {
            console.error(msg);
            deferred.reject(false);
          });
        //
      };

      self.endTrip = function(bookingId) {
        var deferred = $q.defer();
        $http.get("http://dev.afourc.ml/apinew/bookings/" + bookingId + "/end_trip")
          .success(function(data) {
            console.log(data);
            deferred.resolve(true);
          })
          .error(function(msg) {
            console.error(msg);
            deferred.reject(false);
          });

      };

    }); //bookingService close

  // IIFE START //
})();
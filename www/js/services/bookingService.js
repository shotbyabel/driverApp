// IIFE START //
(function() { 
 'use strict';
//REMEMBER: this 'BookingsService can be injected accross controllers'
angular.module('starter')
.service("BookingsService", function($http, $q) {

  var self = this;

  self.bookings = [];

  self.getBookings = function () {
        //create 'defer object'
        var deferred = $q.defer();

        $http.get("http://localhost/apinew/bookings/1456")
        // arrival_address
        //arrival_date
        //car_id
        .success(function success (data) {
          console.log(data);

          var bookingData = data.forEach(function(trip) {
            self.bookings.push({
              arrival_date: trip.arrival_date
            });
          })

          console.log(self.bookings);

          self.bookings = data;
          // var bookingData = data.forEach(function(trip) {
          //   self.bookings.push({
          //     arrival_date: trip.arrival_date
          //   });
          // })
          console.log(data);

          // self.bookings = data.results; //assign the bookings[] results
          // console.log(self.bookings);
          deferred.resolve(true);

        })
        .error(function error (smg) {
          console.error(msg);
          deferred.reject(false);
        })

        return deferred.promise;//promise has a '.then' functions -> 
      };

  self.startTrip = function(bookingId) {
      var deferred = $q.defer();
      $http.get("http://localhost/apinew/bookings/" + bookingId + "/start_trip")
      .success(function(data) { 
        console.log(data);
        deferred.resolve(true);
      })
      .error (function(msg) {
        console.error(msg);
        deferred.reject(false);
      });
// 
    };

  self.endTrip = function(bookingId) {
      var deferred = $q.defer();
      $http.get("http://localhost/apinew/bookings/" + bookingId + "/end_trip")
      .success(function(data) {
        console.log(data);
        deferred.resolve(true);
      })
      .error (function(msg) {
        console.error(msg);
        deferred.reject(false);
      });

    };
});

 // IIFE START //
})();

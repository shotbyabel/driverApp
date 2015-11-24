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

        $http.get("http://localhost/apinew/bookings/1454")
        .success(function success (data) {
          console.log(data); //entire bookings object console log
          // console.log(data.length);

self.bookings = data;
          // var bookingData = data.forEach(function(trip) {
          //   self.bookings.push({
          //     arrival_date: trip.arrival_date
          //   });
          // })

          // var passengerCount = data.forEach(function(passCount) {
          //   self.bookings.push({
          //     length: passCount.length
          //   });
          // })

          // console.log(self.bookings);//arrival date console log here.

          // console.log(data);
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



    ///|||||||||||||||||||||||||||||||||||||||
   ///geo-location function|||||||||||||||||||
  //||||||||||||||||||||||||||||||||||||||||||
      // $http.get("http://localhost/apinew/usergeolocation/1456/1/1/1")

   // self.driverCurrentGPS = function () {
   //      //create 'defer object'
   //      var deferred = $q.defer();

   //      $http.get("http://localhost/apinew/usergeolocation/1456/1/1/1")
   //      .success(function success (data) {
   //        // console.log(data);

   //        // console.log(self.bookings);
   //        self.bookings = data;

   //        // self.bookings = data.results; //assign the bookings[] results
   //        // console.log(self.bookings);
   //        deferred.resolve(data);

   //      })
   //      .error(function error (smg) {
   //        console.error(msg);
   //        deferred.reject(false);
   //      })

   //      return deferred.promise;//promise has a '.then' functions ->
   //    };


/////////////////////////
//START-END trips//////
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

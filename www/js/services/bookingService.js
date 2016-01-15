// IIFE START //
(function() {
  'use strict';
  angular.module('starter')
    .service("BookingsService", function($http, $q) {

      var self = this;
      self.bookings = [];
      self.bookingsCustomers = [];

      //GET FROM ARRAY
      self.getBookings = function() {
        //create 'defer object'
        var deferred = $q.defer();
        console.log(self)
          //update to .user_id - got rid of getNames function
        // $http.get("http://localhost/apinew/bookings/" + self.driver_id)//LOCAL
        $http.get("http://dev.afourc.ml/apinew/bookings/" + self.driver_id)//DEVELOPMENT
          .success(function success(data) {
            console.log(data); //entire bookings object console log
            self.bookingsData = data[0]; //first array, bookings
            self.bookingsCustomers = data[1]; //second array the customer info
            self.bookingsOptions = data[2];// options
            self.bookingsCars = data[3];//cars
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

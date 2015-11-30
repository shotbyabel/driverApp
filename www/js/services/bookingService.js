
// IIFE START //
(function() {
 'use strict';
angular.module('starter')
.service("BookingsService", function($http, $q) {

  var self = this;
  self.bookings = [];
  self.bookingsCustomers = [];

//GET FROM ARRAY
  self.getBookings = function () {
    //create 'defer object'
    var deferred = $q.defer();
    //update to .user_id - got rid of getNames function
    $http.get("http://localhost/apinew/bookings/" + self.user_id)
    .success(function success (data) {
      // console.log(data); //entire bookings object console log
      self.bookings = data[0];//first array, bookings
      self.bookingsCustomers = data[1];//second array the customer info
      deferred.resolve(true);
      })
    .error(function error (msg) {
      console.error(msg);
      deferred.reject(false);
      })
    return deferred.promise;//promise has a '.then' functions ->
    };

//START-END trips//////
  self.startTrip = function(bookingId) {
    //store the id for the trip to be used later..
    self.currentBookingTripId = bookingId;

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

});//bookingService close

 // IIFE START //
})();

angular.module('starter')
.service("BookingsService", function($http, $q) {

  var self = this;

  self.bookings = [];

//////////////////////////////////////
///////works!
//////////////////////////////////

  self.getBookings = function () {

        var deferred = $q.defer();

        $http.get("http://localhost/apinew/bookings/1456")
        .success(function success (data) {
          console.log(data);

          var bookingData = data.forEach(function(trip) {
            self.bookings.push({
              arrival_date: trip.arrival_date
            });
          })

          console.log(self.bookings);
          self.bookings = data;
          console.log(data);
          deferred.resolve(true);

        })
        .error(function error (smg) {
          console.error(msg);
          deferred.reject(false);
        })

        return deferred.promise;
      };

//////////////////////////////////////
///////NOT WORKING
//////////////////////////////////

         self.driverCurrentGPS = function () {
        //create 'defer object'
        var deferred = $q.defer();

        $http.get("http://localhost/apinew/usergeolocation/1456/1/1/1")
        .success(function success (data) {
          console.log(data);

          var currentGPS = data.forEach(function(gps) {
            //I have a feeling this is WRONG. 'self.bookings'
            self.bookings.push({
              //lat for the lat: value in the JSON object..
              //i would like to push Lat and Ln (latitude & longitude)
              lat: gps.lat
            });
          })
          //and what I am trying to console.log is wrong too..
          console.log(self.bookings);
          self.bookings = data;
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


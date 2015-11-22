// IIFE START //
(function() { 
 'use strict';
 angular.module('starter')
 .service('driverLocationService', function() {

  var self = this;
  driverTripTimer = null;


  function updateDriverLocation = function(booking_id, user_id) {
              //create 'defer object'
              var deferred = $q.defer();
              var url = "http://localhost/apinew/usergeolocation/";

        /*sample code for Cordova Map PLug in

          var latitude = $cordovaGeoLocation.getLat(),
              longitude = $cordovaGeoLocation.getLong();
        
          var requestData = user_id + '/' + latitude + '/' +
           longitude + '/' + booking_id;

           */


           $http.get(url + requestData)
           .success(function success (data) {
            if(data){
              deferred.resolve(true);
            }
          })
           .error(function error (smg) {
            console.error(msg);
            deferred.reject(false);
          })

        return deferred.promise;//promise has a '.then' functions -> 

      };

      self.startDriverTrip = function(booking_id, user_id){
        ///code to try the timer 
        //driverTripTimer = $interval(function(){
        //   updateDriverLocation(booking_id, user_id);
        // }, 60000)
      }

      self.stopDriverTrip = function(){
        // $interval.cancel(driverTripTimer);
      }



    })







 // IIFE START //
})();

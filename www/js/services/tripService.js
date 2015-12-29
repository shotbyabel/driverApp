(function() {
 'use strict';
 angular.module('starter')
 .service('tripService', function($http, $q, $cordovaGeolocation, $ionicPopup, $interval) {

    var self = this;
    var driverTripTimer = null;

    self.tripStart = false;

    self.updateDriverLocation = function(booking_id, user_id) {
        //create 'defer object'
        var deferred = $q.defer();
        // var url = "http://dev.afourc.ml/apinew/usergeolocation/"; //DEVELOPMENT
        var url = "http://localhost/apinew/usergeolocation/"; //LOCAL


        var options = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation.getCurrentPosition(options).then(function(position){
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          console.log(latitude, longitude);

          var requestData = user_id + '/' + latitude + '/' +
           longitude + '/' + booking_id;
           console.log(requestData);
           $http.get(url + requestData)
           .success(function success (data) {
            if(data){
              return (data);
              deferred.resolve(true);
            }
          })

           .error(function error (smg) {
            return (msg);
            deferred.reject(false);

          //added for getLocation
          }, function (err) {
            console.error("Error getting position");
            console.error(err);
          });

        return deferred.promise;//promise has a '.then' functions ->
         });
      };

      self.startDriverTrip = function(booking_id, user_id){
        self.tripStart = true;
        ///CODE TO TRY & GET THE TIMER WORKING
        driverTripTimer = $interval(function(){
          self.updateDriverLocation(booking_id, user_id);
        }, 3000)
      }

      self.stopDriverTrip = function(booking_id, user_id){
        self.tripStart = false;
        $interval.cancel(driverTripTimer);
      };

    });


 // IIFE START //
})();

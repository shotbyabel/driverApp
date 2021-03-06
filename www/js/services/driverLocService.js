(function() { 
 'use strict';
 angular.module('starter')
 .service('driverLocationService', function($http, $q, $cordovaGeolocation, $ionicPopup, $interval) {

    var self = this;
    var driverTripTimer = null;

    self.updateDriverLocation = function(booking_id, user_id) {
        //create 'defer object'
        console.log(navigator);
        var deferred = $q.defer();
           
        var url = "http://localhost/apinew/usergeolocation/";//LOCAL
        // var url = "http://dev.afourc.ml/apinew/usergeolocation/";//DEVELOPMENT

        navigator.geolocation.getCurrentPosition(function(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          console.log(latitude, longitude);

          var requestData = user_id + '/' + latitude + '/' +
           longitude + '/' + booking_id;
           console.log(requestData);
           $http.get(url + requestData)
           .success(function success (data) {
            if(data){
              console.log(data);
              deferred.resolve(true);
            }
          })

           .error(function error (smg) {
            console.error(msg);
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
        ///CODE TO TRY & GET THE TIMER WORKING
        driverTripTimer = $interval(function(){
          self.updateDriverLocation(booking_id, user_id);
        }, 10000)
      }

      self.stopDriverTrip = function(booking_id, user_id){
        $interval.cancel(driverTripTimer);
      };

    });


 // IIFE START //
})();
// IIFE START //
(function() {
 'use strict';

angular.module('starter')
  .controller('TripCtrl', function($scope, $state, $cordovaGeolocation, $ionicSideMenuDelegate, $ionicLoading, BookingsService, tripService, UserService){
  $ionicSideMenuDelegate.canDragContent(true)

  $ionicLoading.show({template: 'Loading Your Trip Info...'});

  $scope.currentBooking = BookingsService.currentBooking;
  $scope.currentCustomer = BookingsService.currentCustomer;

  console.log($scope);

  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var geocoder = new google.maps.Geocoder();

    var departing = $scope.currentBooking.departing_address;
    var arrival = $scope.currentBooking.arrival_address;

    geocoder.geocode({'address': departing}, function(res, status) {
      if(status === google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          map: $scope.map,
          position: res[0].geometry.location
        });
        var infoWindow = new google.maps.InfoWindow({
          content: "Departing Address"
        });
        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    })

    geocoder.geocode({'address': arrival}, function(res, status) {
      if(status === google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          map: $scope.map,
          position: res[0].geometry.location
        });
        var infoWindow = new google.maps.InfoWindow({
          content: "Arrival Address"
        });
        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    })

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      $ionicLoading.hide();

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });

      var infoWindow = new google.maps.InfoWindow({
          content: "This is You!"
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });

    });

  }, function(error){
    console.log("Could not get location");
  });

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $ionicLoading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };
//////////////////////////////////////////////////////////////
///SWIPE-RIGHT from trip-details TO current-trip .state///////
//////////////////////////////////////////////////////////////

    $scope.onSwipeRight = function() {
      document.getElementById('endTrip').style.display = 'inline-block';
      document.getElementById('startTrip').style.display = 'none';
      $scope.startTrip();
    }

////////////////////////////////////
/// START & END driver trips////////
////////////////////////////////////

    $scope.startTrip = function() {
      //updated w/user_id
      tripService.startDriverTrip($scope.currentBooking.id, UserService.id);
      BookingsService.startTrip($scope.currentBooking.id);
    }

    $scope.endTrip = function() {
      //updated w/user_id
      tripService.stopDriverTrip($scope.currentBooking.id, UserService.id);
      BookingsService.endTrip($scope.currentBooking.id);
      document.getElementById('endTrip').style.display = 'none';
      document.getElementById('startTrip').style.display = 'inline-block';
    }

});
 // IIFE START //
})();

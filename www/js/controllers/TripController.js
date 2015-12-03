// IIFE START //
(function() {
 'use strict';

angular.module('starter')
  .controller('TripCtrl', function($scope, $state, $cordovaGeolocation, $ionicSideMenuDelegate, $ionicLoading, BookingsService, driverLocationService, UserService){
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
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

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

  //////////////////////////////////////////////////////////////
///SWIPE-RIGHT from trip-details TO current-trip .state//////
$scope.onSwipeRight = function() {
  $scope.startTrip();
}
////////////////////////////////////
/// START & END driver trips

    $scope.startTrip = function() {
      //updated w/user_id
      driverLocationService.startDriverTrip($scope.currentBooking.id, UserService.user.id);
      BookingsService.startTrip($scope.currentBooking.id);
    }

    $scope.endTrip = function() {
      //updated w/user_id
      driverLocationService.stopDriverTrip($scope.currentBooking.id, UserService.user.id);
      BookingsService.endTrip($scope.currentBooking.id);
    }

});
 // IIFE START //
})();

// IIFE START //
(function() {
 'use strict';

angular.module('starter')
  .controller('MapCtrl', function($scope, $ionicLoading, driverLocationService){

    $scope.mapCreated = function(map) {
      $scope.map = map;
      $scope.infoWindow = new google.maps.InfoWindow({map: map});
    };

    $scope.centerOnMe = function () {
      console.log("Centering");
      if (!$scope.map) {
        return;
      }
// ////from ngCordova DOCS//////
//       function showMap(coords) {
//         var mapOptions = {
//         center: {lat: coords.latitude, lng: coords.longitue},
//         zoom: 8
//       };
//       var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//     }
// ////from ngCordova DOCS//////   

    $scope.loading = $ionicLoading.show({
      content: 'Getting your location...',
      showBackdrop: false

    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.infoWindow.setPosition(pos.coords.latitude, pos.coords.longitude);
      $scope.infoWindow.setContent('You');
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));


      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get your location G: ' + error.message);
    });
// ////from ngCordova DOCS//////
//       driverLocationService.getPosition()
//         .then(function(position) {
//         $scope.coords = position.coords;
//         showMap(position.coords);
//       }, function(err) {
//         console.log('getCurrentPosition error: ' + angular.toJson(err));
//       });
// ////from ngCordova DOCS//////

  };
});


 // IIFE START //
})();

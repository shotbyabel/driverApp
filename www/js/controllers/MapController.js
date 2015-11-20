// IIFE START //
(function() {
 'use strict';

angular.module('starter')
  .controller('MapCtrl', function($scope, $ionicLoading){

    $scope.mapCreated = function(map) {
      $scope.map = map;
      $scope.infoWindow = new google.maps.InfoWindow({map: map});
    };

    $scope.centerOnMe = function () {
      console.log("Centering");
      if (!$scope.map) {
        return;
      }

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
  };
});


 // IIFE START //
})();

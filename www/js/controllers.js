(function() {
  "use strict";

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal, $ionicPopup, $timeout, $state, $cordovaSms, $ionicPlatform) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {});

  $ionicSideMenuDelegate.canDragContent(true);

})

//sideMenuCtl holds logic for Side Menu links and functions..
.controller('sideMenuCtl', function($scope, $state, UserService, LoginService, BookingsService, $ionicPopup) {
  $scope.state = $state;
  $scope.UserService = UserService;

  $scope.logout = function() {
    LoginService.logout(); //inject the LoginService run logout function loginService.js line: 30
  };
//new pop up
  $scope.checkCurrentTrip = function() {
    if(!BookingsService.currentBooking) {
      var currentTripPopup = $ionicPopup.confirm({
        title: 'Start a Trip!',
        template: 'You must start a trip first!'
      });
      currentTripPopup.then(function(res) {
        if (res) return;
      });
    }else
      $state.go('app.current-trip');
  }

})


.controller('PassListCtrl', function($scope, $stateParams) {

})
})();

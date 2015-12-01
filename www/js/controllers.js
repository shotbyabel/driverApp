angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
  });

  $ionicSideMenuDelegate.canDragContent(true);

})

.controller('sideMenuCtl', function($scope, $state){
  $scope.state = $state;

})

.controller('PassListCtrl', function($scope, $stateParams) {
});

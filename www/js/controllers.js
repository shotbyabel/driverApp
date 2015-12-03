angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal, $ionicPopup, $timeout, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
  });

  $ionicSideMenuDelegate.canDragContent(true);

})

.controller('sideMenuCtl', function($scope, $state, UserService){
  $scope.state = $state;

})

.controller('PassListCtrl', function($scope, $stateParams) {

})

////////////////////////////////////
//TEMP-LOG OUT POP UP
.controller('PopupCtrl',function($scope, $ionicPopup, $timeout, $state, $http, LoginService) {

    $scope.showConfirm = function() {
    LoginService.logout(); //inject the LoginService into the controller's logout functions
   };
});  


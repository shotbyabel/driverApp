// IIFE START //
(function() {
  'use strict';
//NOT FINISHED
  angular.module('starter')
    .controller('PushCtrl',
      function($scope, $rootScope, $ionicUser, $ionicPush, 
                BookingsService, tripService, UserService) {

    $scope.identifyUser = function() {
      var user = $ionicUser.ger();

      if (!user.user_id) {
        user.user_id = $ionicUser.generateGUID();
      }
    };    

///NEED TO FINISH THIS>.. 




















          });
  // IIFE START //
})();
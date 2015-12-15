// IIFE START //
(function() {
 'use strict';

  angular.module('starter')
    .controller('ProfileCtrl',
      function ($scope, $http, $state, UserService, profileService, $ionicPopup) {
      $scope.user = UserService;

      $scope.profUpdateForm = {}

      $scope.onSubmit = function() {
        var fullName = $scope.profUpdateForm.Fullname;
        console.log(fullName);
      }

      $scope.updateConfirm = function(form) {
        var endTripPopup = $ionicPopup.confirm({
          title: "Are you sure?",
          template: "You are about to Update your Profile."
        });
        endTripPopup.then(function(res) {
          if (res) {
            $scope.onSubmit(form)
          }
        })
      }


  });



 // IIFE START //
})();

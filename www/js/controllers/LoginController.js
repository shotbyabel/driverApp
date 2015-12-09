// IIFE START //
(function() {
  'use strict';

  angular.module('starter').controller('LoginCtrl',
    function($scope, $ionicSideMenuDelegate, $http, $state, $ionicLoading, UserService, LoginService) {

      $ionicSideMenuDelegate.canDragContent(false);

      $scope.loginForm = {}//values bind directly to object.. so we dont have scope issues 

      $scope.onSubmit = function() {
        var userLogin = $scope.loginForm.Username;
        var userPw = $scope.loginForm.Password;
    //**5** moved & got rid of the conditionals *if (res.adming), (res.driver) $state.go(app.today)
        if (!userLogin || !userPw) {
          alert('Missing Fields!');
          return false;
        }

        $ionicLoading.show({
          template: 'Fetching your passengers...'
        });
        
        //**4**inject LoginService - $http get req. was moved to LogingService
        // we are calling login() from loginService line 8
        LoginService.login(userLogin, userPw).then(function(response) {
          $ionicLoading.hide();//$ionicLoading
          if (!response) {//if LoginService = false..
            alert('Something went wrong!');
            return;
          }
      //new login logic using UserService object line 61 UserService
          if (UserService.isAdmin()) {
            $state.go("app.easyBook");
          }
      //new login logic using UserService object line 54 UserService
          if (UserService.isDriver()) {
            $state.go("app.today");
          }
        });
      };
    });
  // IIFE START //
})();
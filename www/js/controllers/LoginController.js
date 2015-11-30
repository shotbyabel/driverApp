// IIFE START //
(function() {
 'use strict';

  angular.module('starter')
    .controller('LoginCtrl', function ($scope, $http, $state, $ionicLoading, UserService) {

    $scope.loginForm ={}
    $scope.onSubmit = function () {

       // - theLoginForm was not defined in the scope.
      if ($scope.loginForm.Username && $scope.loginForm.Password) {
      $ionicLoading.show({template: 'Fetching your passengers...'});

      //SEND LOGIN CREDENTIALS TO API//
      var userLogin = $scope.loginForm.Username;
      var userPw = $scope.loginForm.Password;

      //PHP BACK END TEST
       $http.get("http://localhost/apinew/login" + "/" + userLogin + "/" + userPw)
        .success(function (res) {
        $ionicLoading.hide();
        if(typeof(res) === "string") {
         alert("INVALID LOGIN");
         $state.go("app.login");
       }  else {
          console.log(res);
          UserService.save(res);
          console.log("Login Credentials Submitted Succesfully!")

          if(res.admin) $state.go("app2.owner-calendar");
          if(res.driver) $state.go("app.today", {user_id: res.id, driver_id: res.driver.id});


          // $state.go("app.today");

        }
        }).error(function(data) {
          $ionicLoading.hide();
          console.log("Failed, Please check your API end point!")
        })
      }
    };
  });


// IIFE START //
})();


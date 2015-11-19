// IIFE START //
(function() { 
 'use strict';

  angular.module('starter')
    .controller('LoginCtrl', function ($scope, $http, $state) {

    $scope.loginForm ={}
    $scope.onSubmit = function () {
      
       // - theLoginForm was not defined in the scope.
      if ($scope.loginForm.Username && $scope.loginForm.Password) {

      //SEND LOGIN CREDENTIALS TO API// 
      var userLogin = $scope.loginForm.Username;
      var userPw = $scope.loginForm.Password;

      //PHP BACK END TEST
       $http.get("http://localhost/apinew/login" + "/" + userLogin + "/" + userPw)
        .success(function (res) {
         
        if(typeof(res) === "string") {
         alert("INVALID LOGIN");       
         $state.go("app.login");
       }  else {
          console.log("Login Credentials Submitted Succesfully!")
          if(res.driver !== "null") $state.go("app.map"); 
          if(res.admin === "1") $state.go("app2.master-calendar"); 

          console.log(res.driver !== "null");
          console.log(res.admin === "1");

          // $state.go("app.today"); 

        }
        }).error(function(data) {          
          console.log("Failed, Please check your API end point!")       
        });
      }
    };
  });

// IIFE START //
})();
  
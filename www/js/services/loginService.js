// S W I T C H LINE 18 & 19 TO FALSE to turn LOGIN AUTH back on

(function() {
  'use strict';

  angular.module('starter').service('LoginService', function($q, UserService, $http, $ionicPopup, $state) {
    //**2**
    var self = this; //initiating loginService inside here its self

    self.login = function(userLogin, userPw) { //line 27 from longinController.. -
      var deferred = $q.defer();
      //**1**moved from LoginController
      // $http.get("http://localhost/apinew/login" + "/" + userLogin + "/" + userPw) //LOCAL
      $http.get("http://dev.afourc.ml/apinew/login" + "/" + userLogin + "/" + userPw) //DEV
        .success(function(result) {
          console.log(result);
          if (!result.result) { //result is return boolean of the API
            // if (result === '') { *did not work*//
            deferred.resolve(false); //switch to false to check auth
            return false; //no UX message in Services, Best to put in controllers! //switch to false to check auth
          }
          UserService.save(result.data); //**added`.data` login user here**data is the data the API returns (User Object)
          console.log("Login Credentials Submitted Succesfully!");
          deferred.resolve(true);
          return true;
        }).error(function(data) {
          alert('Something went wrong');
          deferred.resolve(data);
        })

      return deferred.promise;
    }; //login()


    //**use logout function in menu.html & controller.js
    self.logout = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'EXIT?',
        template: 'Are you sure you want to Log out?'
      });
      confirmPopup.then(function(res) {
        console.log(res);
        if (res) {
          $http.get("http://dev.afourc.ml/users/logout"); //PHP route from back-end
          UserService.clear(); //clear storage - cache -check to see if user is empty with window.localStorage
          $state.go("login");
        }
      });
    };
  });
})();
//USE window.localStorage to check Local Storage data in console
//got rid of the loginUser: function(name, pw)
// when you want to verify the user to a REST server,
// you need to make it async.

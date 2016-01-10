(function() {
 'use strict';
 angular.module('starter')
 .service('profileService', function($http, $q, UserService) {

    var self = this;
    self.update = function(form) {
      var deferred = $q.defer();
      var id = UserService.id
      $http.get("http://localhost/users/" + {id} + "/edit")
      .success(function(res) {
        console.log(res);
        deferred.resolve(true);
      })
      .error(function(res) {
        console.log(res);
        deferred.resolve(res);
      })
      return deferred.promise;
    }

    });

 // IIFE START //
})();

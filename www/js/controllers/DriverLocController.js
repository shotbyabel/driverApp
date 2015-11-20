// IIFE START //
(function() { 
 'use strict';

angular.module('starter')
  .controller("DriverLocCtrl", function($scope) {


setTimeout(function() {
  console.log("called");
  $scope.CurrentLoc = ("Now", 5000);

});

});



 // IIFE START //
})();    
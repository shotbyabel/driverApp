(function() {
 'use strict';

angular.module('starter')
 .controller('CalendarCtrl', function ($scope, $cordovaCalendar) {

    $scope.createEvent = function() {
        $cordovaCalendar.createEvent({
            title: 'Pickup Passanger',
            location: 'Hollywood',
            notes: 'No Talking',
            startDate: new Date(2015, 0, 15, 18, 30, 0, 0, 0),
            endDate: new Date(2015, 1, 17, 12, 0, 0, 0, 0)
        }).then(function (result) {
            console.log("Event created successfully");
        }, function (err) {
            console.error("There was an error: " + err);
        });
    }

 });



























 })();
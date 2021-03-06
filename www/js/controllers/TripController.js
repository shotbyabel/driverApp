// IIFE START //
(function() {
  'use strict';

  angular.module('starter')
    .controller('TripCtrl',
      function($scope, $state, $cordovaGeolocation, $ionicSideMenuDelegate, $ionicLoading, $ionicModal, $cordovaSms,
        BookingsService, tripService, UserService, $ionicPopup, $ionicPlatform) {

        $scope.$on('$ionicView.enter', function() { //added as debugger because MAYBE our code is taking the location BEFORE 
                                                    //it's filled with the bookings inside the service - NOT the issue but it dont hurt to have it.

          $ionicSideMenuDelegate.canDragContent(true)

          $ionicLoading.show({
            template: 'Loading Your Trip Info...'
          });
          //use to bind tripDetails arrival & departure addresses curren-trip.html
          $scope.currentBooking = BookingsService.currentBooking;
          $scope.currentCustomer = BookingsService.currentCustomer;
          $scope.currentBookingOptions = BookingsService.currentBookingOptions;
          // $scope.currentBookingCars = BookingsService.currentBookingCars;
          $scope.sms = {};


          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer;

          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: {
              lat: 34.1017614,
              lng: -118.3450541
            }
          });

          directionsDisplay.setMap(map);

          $ionicLoading.hide();

          var departing = $scope.currentBooking.departing_address;//
          var arrival = $scope.currentBooking.arrival_address;//

          calculateAndDisplayRoute(directionsService, directionsDisplay, departing, arrival);
          /////////////////////////////////
          ////C O N T A C - C L I E N t - M O D A L
          $ionicModal.fromTemplateUrl('templates/contact-client.html', {
            scope: $scope,
            animation: 'slide-in-up'

          }).then(function(modal) {
            $scope.modal = modal;
          });

        }); //ionicView.enter

        function calculateAndDisplayRoute(directionsService, directionsDisplay, departing, arrival) {
          directionsService.route({
            origin: departing,
            destination: arrival,
            travelMode: google.maps.TravelMode.DRIVING
          }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
        }

        $scope.contactCLient = function() {
          $scope.modal.show();

        };

        $scope.closeContactClient = function() {
          $scope.modal.hide();
        };
        //////////

        $scope.centerOnMe = function() {
          if (!$scope.map) {
            return;
          }

          $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
          });

          navigator.geolocation.getCurrentPosition(function(pos) {
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $ionicLoading.hide();
          }, function(error) {
            alert('Unable to get location: ' + error.message);
          });
        };

        //////////////////////////////////////////////////////
        /// SMS to Passenger ///
        /////////////////////////////////////////////////////
        $scope.sendSMS = function(buttonIndex) {

          var number = $scope.currentBooking.details.customers[0].phone;
          ///In case we need the platform seperation, use below code
          // var options ={
          //   replaceLineBreaks: false
          // }
          // if($ionicPlatform.isAndroid()){
          //   options.android = {
          //     intent: ''
          //   }
          // }
          var options = {
            // true to replace \n by a new line, false by default
            replaceLineBreaks: false,
            android: {
              // send SMS without open any other app
              intent: ''
                // send SMS with the native android SMS messaging
                // intent: 'INTENT'
            }
          };

          console.log('Passenger Tel:' + $scope.currentBooking.details.customers[0].phone);
          var message = '';

          switch (buttonIndex) {
            case 1:
              message = "Hello, Your driver is 5 minutes away.";
              break;
            case 2:
              message = "Hello, Your drive is 10 minute away.";
              break;
            case 3:
              message = "Hello, Your driver has arrived!";
              break;

            default:
              break;
          }

          console.log('Message: ' + message);

          // var number = "+13109679311";
          // return;
          $ionicPlatform.ready(function() {
            $cordovaSms.send(number, message, options)
              .then(function() {
                console.log('YES');
              }, function(error) {
                console.log(error);
              });
          });
        }; //*sendSMS

        //////////////////////////////////////////////////////////////
        ///SWIPE-RIGHT from trip-details TO current-trip .state///////
        //////////////////////////////////////////////////////////////

        $scope.onSwipeRight = function() {
          document.getElementById('endTrip').style.display = 'inline-block';
          document.getElementById('startTrip').style.display = 'none';
          $scope.startTrip();
        }

        ////////////////////////////////////
        /// START & END driver trips////////
        ////////////////////////////////////

        $scope.startTrip = function() {
          //updated w/user_id
          tripService.startDriverTrip($scope.currentBooking.id, UserService.id);
          BookingsService.startTrip($scope.currentBooking.id);
        }

        $scope.endTrip = function() {
          //updated w/user_id
          tripService.stopDriverTrip($scope.currentBooking.id, UserService.id);
          BookingsService.endTrip($scope.currentBooking.id);
          document.getElementById('endTrip').style.display = 'none';
          document.getElementById('startTrip').style.display = 'inline-block';
        }

        ///////////////////////////////  
        ///endTrip - ARE YOU SURE?/////
        //////////////////////////////
        $scope.endTripConfirm = function() {
          var endTripPopup = $ionicPopup.confirm({
            title: 'End Trip?',
            template: "Are you sure?"
          });
          endTripPopup.then(function(res) {
            if (res) {
              $scope.endTrip()
            }
          })
        }

      });
  // IIFE START //
})();
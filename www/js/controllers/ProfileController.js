// IIFE START //
(function() {
 'use strict';

  angular.module('starter')
    .controller('ProfileCtrl',
      function ($scope, $http, $state, UserService, profileService, $ionicPopup, $cordovaCamera) {
      $scope.user = UserService;

      $scope.profUpdateForm = {}

      $scope.profileInfo = {};

      $scope.onSubmit = function() {
        var fullName = $scope.profUpdateForm;
        profileService.update($scope.profUpdateForm);
      }
      /////////////////
      //camera
      ////////////////
      //sourceType PHOTOLIBRAY . CAMERA
      $scope.addPicture = function() {
        var options = {
          quality: 50,
          destinationType: window.Camera.DestinationType.FILE_URI,
          sourceType: window.Camera.PictureSourceType.CAMERA, //window.CAMERA to test on device
          allowEdit: true,
          encodingType: window.Camera.EncodingType.JPEG,
          targetWidth: 240,
          // popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true


          };

          // **REMEMBER to always follow threse functons with SUCCESS HANDLERS!**
          $cordovaCamera.getPicture(options)
            .then(function (imageData) {
              console.log(imageData);
             $scope.profileInfo.picture = imageData;
              }, function (err) {
                console.error(err);
                $ionicPopup.alert({
                  title: 'Error getting photo',
                  subTitle: "There was a problem getting your photo. Try again"
                });
              });
      }
      ///////////////////////

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

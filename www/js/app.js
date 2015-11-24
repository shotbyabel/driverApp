// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.directives', 'ionic.ion.showWhen'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

 ///||||||||||||||||
///OWNER AUTH-VIEWS
//||||||||||||||||||
.state('app2', {
  url: '/app2',
  abstract: true,
  templateUrl: 'templates/menu-owner.html',
  controller: 'LoginOwnerCtrl'
  })

  .state('app2.owner-today', {
    url: '/owner-today',
    views: {
        'menuContentOwner': {
          templateUrl: 'templates/owner-today.html',
          controller: 'BookingsCtrl'
        }
      }
    })

.state('app2.easyBook', {
    url: '/easyBook',
    views: {
        'menuContentOwner': {
        templateUrl: 'templates/easyBook.html'
        }
      }
    })

  .state('app2.owner-currentTrip', {
    url: '/owner-currentTrip',
    views: {
        'menuContentOwner': {
          templateUrl: 'templates/owner-currentTrip.html',
          controller: 'LoginOwnerCtrl'
        }
      }
    })

  .state('app2.owner-calendar', {
      url: '/owner-calendar',
      views: {
        'menuContentOwner': {
          templateUrl: 'templates/owner-calendar.html'
        }
      }
    })


  .state('app2.owner-profile', {
    url: '/owner-profile',
    views: {
        'menuContentOwner': {
          templateUrl: 'templates/owner-profile.html',
          controller: 'LoginOwnerCtrl'
        }
      }
    })

      .state('app2.owner-settings', {
      url: '/owner-settings',
      views: {
        'menuContentOwner': {
          templateUrl: 'templates/owner-settings.html'
        }
      }
    })

  .state('app2.owner-map', {
      url: '/owner-map',
      views: {
        'menuContentOwner': {
          templateUrl: 'templates/owner-map.html',
          controller: 'MapCtrl'
        }
      }
    })

 ///||||||||||||||||
///OWNER AUTH-VIEWS
//||||||||||||||||||

 ///||||||||||||||||
///DRIVER AUTH-VIEWS
//||||||||||||||||||
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.today', {
    url: '/today/:user_id/:driver_id',
    views: {
        'menuContent': {
          templateUrl: 'templates/today.html',
          controller: 'BookingsCtrl'
        }
      }
    })

    .state('app.bookings', {
    url: '/bookings',
    views: {
        'menuContent': {
          templateUrl: 'templates/bookings.html',
          controller: 'BookingsCtrl',
          controllerAs:'vm'
        }
      }
    })


  // .state('login', {
  //   url: '/login',
  //   templateUrl: 'templates/login.html',
  //   controller: 'LoginCtrl'

  // })

  .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    })

  .state('app.map', {
      url: '/map',
      views: {
        'menuContent': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        }
      }
    })

 .state('app.current-trip', {
    url: '/current-trip',
    views: {
      'menuContent': {
        templateUrl: 'templates/current-trip.html'
      }
    }
  })

  .state('app.calendar', {
      url: '/calendar',
      views: {
        'menuContent': {
          templateUrl: 'templates/calendar.html'
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html'
        }
      }
    })

    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html'
        }
      }
    })

  .state('app.single', {
    url: '/today/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/passlist.html',
        controller: 'PassListCtrl'
      }
    }
  });
   ///||||||||||||||||
///DRIVER AUTH-VIEWS
//||||||||||||||||||
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

//test456 password
//abelh

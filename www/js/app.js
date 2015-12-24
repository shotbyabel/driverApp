// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'ngCordova', 'ngStorage', 'ui.calendar', 
  'ionic.service.push', 'starter.controllers', 'ionic.ion.showWhen'])
///
.run(function($ionicPlatform, $rootScope, UserService) { //inject $rootScope, UserService in order to do route auth..
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
    if (!window.plugins) {
      window.plugins = {};
    }

/////////////////////////////////////////////////////////////////////////
//// added from STEP->5: http://docs.ionic.io/v1.0/docs/push-from-scratch       
      var push = new Ionic.Push({
      "debug": true
      });

      push.register(function(token) {
      console.log("Device token:",token.token);
      });   

      /*
      NOTES:
      For push notifications to work, each device that opens the app should be registered on the push notification sending server(Our case Ionic Push)
      For apple, it registers on APNS, and for android it registers on GCM
      The device token is the identifier that you use to target the push notification
      So let's say you want to send a push notification to someone's phone, you have to save it's device token somewhere when it opens the app
      and then use that to send it the push notification (The way we're doing now with Ionic Push)
      */
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// // kick off the platform web client
// Ionic.io();

// // this will give you a fresh user or the previously saved 'current user'
// var user = Ionic.User.current();

// // if the user doesn't have an id, you'll need to give it one.
// if (!user.id) {
//   user.id = Ionic.User.anonymousId();
//   // user.id = 'your-custom-user-id';
// }

// //persist the user
// user.save();
////////////////////////////////////////////
  });


  ///$stateChangeStart must fire on $tootScope level
  ///https://github.com/angular-ui/ui-router/wiki - reference
  $rootScope.$on("$stateChangeStart", function(event, toState) {
    switch (toState.params.auth) {
      case "admin":
        if (!UserService.isAdmin()) {
          event.preventDefault();
          alert("Admin Only");
        }
        break;

      case "driver":
        if (!UserService.isDriver()) {
          event.preventDefault();
          alert("You are not authorized to access");
        }
        break;

      case 'none':

        break;

      default:
        break;
    }
  });
  ///////////// $stateChangeStart route auth - end
})

//identify PushNotification @ start up with ionic.io.service
.config(['$ionicAppProvider', function($ionicAppProvider) {
  $ionicAppProvider.identify({
    app_id: 'b58207b0',
    api_key: '984d80a1a9857fc14075de09405f8f1551f7dbacffd7faba',
    dev_push: true//only development PUSH notifications - need to set for production later
  });
}])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    params: {
      auth: 'none'
    }
  })
//will update for admin today view (all bookings)
  .state('app.today', {
    url: '/today', //old */:user_id/:driver_id*
    views: {
      'menuContent': {
        templateUrl: 'templates/today.html',
        controller: 'BookingsCtrl',
      }
    },
    params: {
      auth: 'none'
    }
  })

  .state('app.easyBook', {
    url: '/easyBook',
    views: {
      'menuContent': {
        templateUrl: 'templates/easyBook.html'
      }
    },
    ///$stateChangeStart logic for admin ONLY///
    params: {
      auth: 'admin'
    }
    ///
  })


  .state('app.current-trip', {
    url: '/current-trip/',

    views: {
      'menuContent': {
        templateUrl: 'templates/current-trip.html',
        controller: 'TripCtrl'
      }
    },
    params: {
      auth: 'none'
    }
  })

  .state('app.contact-client', {
    url: '/contact-client',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact-client.html',
        controller: 'TripCtrl'
      }
    },
    params: {
      auth: 'none'
    }
  })

  .state('app.bookings', {
    url: '/bookings',
    views: {
      'menuContent': {
        templateUrl: 'templates/bookings.html',
        controller: 'BookingsCtrl',
        controllerAs: 'vm'
      }
    }
  })

  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'TripCtrl'
      }
    }
  })

  .state('app.calendar', {
    url: '/calendar',
    views: {
      'menuContent': {
        templateUrl: 'templates/calendar.html',
        controller: 'BookingsCalendarCtrl'

      }
    },
    params: {
      auth: 'none'
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    },
    params: {
      auth: 'none'
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html'
      }
    },
    params: {
      auth: 'none'
    }
  });

  $urlRouterProvider.otherwise('/login');
});

//test456 password
//abelh

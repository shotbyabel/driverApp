//Special auth OWNER and DRIVERS

//add getBookings functions and SHOW them on the approprate .state.. ('today') state?
//add trip_start & trip_end functions
//add gpsLocation functions : every minute will be called.
///////ANGULAR NOTES..
$scope inside our controller.. our controller(or services) depends on $scope
contrroller("myCtrl"), function ($scope)

PROVIDERS

can only inject them in an 
app.config(function ($httpProvider))
default header for all http request?







////Bookings-CONTROLLER EXAMPLE:/// 
app.controller("bookingsCtrl" function($scope, BookingsService) {

  $scope.today = {
    'bookings': []
  }
  
  //AFTER $http service we call our function in the Ctrl?
  //why on the controller?
  BookingsService.getBookings().then(function success (data) {
    console.log(data) 
    $scope.today = BookingsService.bookings;
  }, function error (data) {
    console.log(data)

  });

  //this reference gets US the BookingsService / 'contacts: []'
      //
  // $scope.today = BookingsService;

  
});

///SERVICE EXAMPLE: returns a list of people from ng-repeat
service returns 

app.service("BookingsService", function($http, $q) {

//refer to our object WITHIN our object
var self = {
  'bookings':[]
  'getBookings': function () {
    //create a 'defer object'
    var d = $q.defer();
    $http.get("http://localhost/apinew/bookings/2/start_trip") //request to api
    .success(function success (data) { //
      console.log(data);
      self.bookings = data.results; //assign the bookings[] results
      d.resolve("ha! bookings received");//need to call this for success handler to be called.
      
    })
    .error (function error (msg) {
      console.error(msg);
      d.reject("no bookings received");
    });
    return d.promise;//promise has a '.then' functions -> 
  }
  

};
  
  return self;


  };
});

// WE can inject this BookingsService accross controllers.


////setTimeout functions for get driversGPS

// digest cycle.. 
// checks..






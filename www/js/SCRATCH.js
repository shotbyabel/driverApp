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
  
  //AFTER $http service we call our function in the Ctrl?
  //why on the controller?
  BookingsService.getBookings();

  //this reference gets US the ContactService / 'contacts: []'
  $scope.model = BookingsService;

  
});

///SERVICE EXAMPLE: returns a list of people from ng-repeat
service returns 

app.service("BookingsService", function($http) {

//refer to our object WITHIN our object
var self = {
  'bookings':[]
  'getBookings': function () {
    $http.get("http://localhost/apinew/")
    .success(function success (data) {
      console.log(data);
      self.bookings = data.results;

    })
    .error (function error (msg) {
      console.log(msg)l;

    })
  }
  

};
  
  return self;


  };
});

WE can inject this BookingsService accross controllers.


angular.module('starter') 
  .service('UserService', function(){
//set up ONLY for drivers ATM
    var self = this;
//initialized empty to fill up with user's info upon sign in.
    self.user = {};
    self.user.id = null
    self.user.driver_id = null
    self.user.name = null
    self.user.email = null
    self.user.phone = null
//save as 'userObject'
    self.save = function(userObject) {
      self.user.id = userObject.id;
      self.user.driver_id = userObject.driver.driver_id;
      self.user.name = userObject.Fullname;
      self.user.email = userObject.email;
      self.user.phone = userObject.mobile;
    }    
  });
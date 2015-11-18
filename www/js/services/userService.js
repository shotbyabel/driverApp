angular.module('starter') 
  .service('UserService', function(){

    //object

    var self = this

    self.driver_id = null
    self.name = null
    self.email = null
    self.phone = null
    self.address = null

    self.save = function( userObject) {
      self.driver_id = userObject.driver_id;
      self.name = userObject.name;
      self.email = userObject.email;
      self.phone = userObject.phone;
      self.address = userObject.address;
    }
    
  })
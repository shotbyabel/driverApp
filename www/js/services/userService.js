(function() {
  "use strict";

  angular.module('starter').service('UserService',
    function($localStorage) {

      var self = this;
      //initialized empty to fill up with user's info upon sign in.
      self.initialize = function() {

        //$localStorage setup
        var usersObject = $localStorage.user;
        console.log(usersObject);
        if (!usersObject) {//if there's NO usersObject use empty string.
          usersObject = {};
        }

        self.id = usersObject.id || '';
        self.title = usersObject.title || '';
        self.first_name = usersObject.first_name || '';
        self.last_name = usersObject.last_name || '';
        self.company_id = usersObject.company_id || '';
        self.mangopay_user_id = usersObject.mangopay_user_id || '';
        self.country_id = usersObject.country_id || '';
        self.address = usersObject.address || '';
        self.address_number = usersObject.address_number || '';
        self.address_code_postal = usersObject.address_code_postal || '';
        self.mobile = usersObject.mobile || '';
        self.phone = usersObject.phone || '';
        self.birthdate = usersObject.birthdate || '';
        self.username = usersObject.username || '';
        self.email = usersObject.email || '';
        self.created_at = usersObject.created_at || '';
        self.updated_at = usersObject.updated_at || '';
        self.admin = usersObject.admin || '';
        self.active = usersObject.active || '';
        self.avatar_url = usersObject.avatar_url || '';
        self.img = usersObject.img || '';
        self.session_id = usersObject.session_id || '';
        self.Fullname = usersObject.Fullname || '';
        self.driver = usersObject.driver || null; //how we defined drivers & admins on login
      };
      //storing userObject in local storage
      self.save = function(userObject) {
        $localStorage.user = userObject; //Stores user in local storage
        return self.initialize(); //calls function to store the user info inside the service; to be able to use UserService.id, for example
      }
      //for logout- clear cache
      self.clear = function(){
        delete $localStorage.user;
        self.initialize();
        $localStorage.user = self;
      }
    //driver storage
      self.isDriver = function() {
        if (self.driver !== null) {
          return true;
        }
        return false;
      }

      self.isAdmin = function() {
        if (self.driver === null) {
          return true;
        }
        return false
      }

      self.initialize();//refresh was not working because function was not called

    });
})();
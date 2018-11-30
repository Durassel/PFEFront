"use strict";

let login_controller = function loginController($http, $state, $scope, GlobalConfigFactory, $window) {
  let self = this;
  self.url = GlobalConfigFactory.url_back;

  self.submit = function() {
    
    console.log("TEST")
    $http({
      method: 'POST',
      url: self.url + 'users/userLogin',
      crossDomain: true,
      data: {
        idUser: $scope.name,
        password:  $scope.password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
    	if (response.data) {
      	$window.location.href = '/#!/index';
    	} else {
        console.log("Error")
      	self.error = "An error occurred. Invalid credentials."
      }
    })
  }

};

login_controller.$inject = ['$http', '$state', '$scope' ,'GlobalConfigFactory','$window'];

let login = {
    templateUrl: 'app/components/login/login.html',
    controllerAs: "lgn",
    controller: login_controller
};

module.exports = login;
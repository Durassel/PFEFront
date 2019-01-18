"use strict";

let login_controller = function loginController($http, $state, $scope, GlobalConfigFactory, $window) {
  let self = this;
  self.url = GlobalConfigFactory.url_back;

  // Check user authentication
  $http.get(self.url + 'users/authrequired').then((response) => {
    if (JSON.parse(response.data)) {
      $window.location.href = '/#!/index';
    }
  })

  self.submit = function() {
    $http.post(self.url + 'users/login', {
      username: $scope.username,
      password: $scope.password
    }).then((response) => {
    	if (response.data) {
        $window.localStorage.setItem("user", JSON.stringify(response.data))
      	$window.location.href = '/#!/index';
    	} else {
      	self.error = "An error occurred. Invalid credentials."
      }
    })
  }
};

login_controller.$inject = ['$http', '$state', '$scope', 'GlobalConfigFactory', '$window'];

let login = {
    templateUrl: 'app/components/login/login.html',
    controllerAs: "lgn",
    controller: login_controller
};

module.exports = login;
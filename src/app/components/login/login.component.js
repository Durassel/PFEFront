"use strict";

let login_controller = function loginController($http, $state, $scope, GlobalConfigFactory, $window) {
  let self = this;
  self.url = GlobalConfigFactory.url_back;

  self.submit = function() {
    
     $http({
      method: 'POST',
      url: self.url + 'users/userLogin/',
      data: {
        idUser: $scope.name,
        password:  $scope.password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
      	if (response.data) {
          $window.sessionStorage.setItem("idUser",name);
          $window.sessionStorage.setItem("job",response.data.job);
        	$window.location.href = '/#!/index';
      	} else {
        	alert("error")
        }
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
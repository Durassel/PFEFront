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
      	if(response.data.login)
      	{
        	self.name = name
        	$window.location.href = '/#!/index';
      	}
        else
        	alert("error")
        console.log("response: ",response)
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
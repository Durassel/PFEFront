"use strict";

let index_controller = function indexController($http, $state, GlobalConfigFactory, $element) {
  let self = this;
  self.url = GlobalConfigFactory.url_back;
  // self.login = false;

  // self.loginClick = function() {
  // 	self.login = true;
  // }

  // self.loginClose = function() {
  // 	self.login = false;
  // }
  $http.get(self.url + 'users/').then((response) => {
    self.users = response.data
  })
  
  self.clickUser = function(user) {
    self.user = user

    $http.get(self.url + 'data/' + user.idUser).then((response) => {
      self.user_data = response.data
    })
  }

  // Test du set de data
//   $http({
//     method: 'POST',
//     url: self.url + 'data/set',
//     data: {
//       "giletid":"0123456789",
//       "global":[{
//         "date":"2018-12-22",
//         "data":[{
//           "typeId":"000",
//           "sensors":{
//             "x1":"8",
//             "y1":"0",
//             "z1":"3",
//             "x2":"9",
//             "y2":"4",
//             "z2":"1"
//           }
//         }]
//       }]
//     },
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then((response) => {
//     console.log(response)
//   })
};

index_controller.$inject = ['$http', '$state', 'GlobalConfigFactory', '$element'];

let index = {
    templateUrl: 'app/components/index/index.html',
    controllerAs: "iwc",
    controller: index_controller
};

module.exports = index;
"use strict";

let index_controller = function indexController($http, $state, GlobalConfigFactory, $element) {
  let self = this;
  self.url = GlobalConfigFactory.url_back;
  
};

index_controller.$inject = ['$http', '$state', 'GlobalConfigFactory', '$element'];

let index = {
    templateUrl: 'app/components/index/index.html',
    controllerAs: "iwc",
    controller: index_controller
};

module.exports = index;
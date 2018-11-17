"use strict";

let index_directive = function  () {
  let directive = {
    link: link,
    restrict: 'EA'
  };

  return directive;

  function link(scope, element, attrs) {
    
  }
};

index_directive.$inject = [];
module.exports = index_directive;
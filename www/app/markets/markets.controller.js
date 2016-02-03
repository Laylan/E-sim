(function() {
  'use strict';

  angular
    .module('markets.module')
    .controller('MarketsController', MarketsController);

  MarketsController.$inject = ['$scope', '$rootScope'];

  /* @ngInject */
  function MarketsController($scope, $rootScope){

    // vars
    var vm = this;
    vm.property = 'MarketsController';

    // definitions

    // inits
    activate();

    ////////////////

    function activate() {
    }
  }

})();

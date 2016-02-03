(function () {
  'use strict';

  angular
    .module('fight-list.module')
    .controller('FightListController', FightListController);

  FightListController.$inject = ['$ionicScrollDelegate', 'FightListData', 'fights'];

  /* @ngInject */
  function FightListController($ionicScrollDelegate, FightListData, fights) {

    /* jshint validthis: true */
    var vm = this;
    vm.property = 'FightListController';

    // variables
    vm.fights = fights;
    vm.hideFilter = true;

    // functions definitions
    vm.toggleFilter = toggleFilter;

    // init functions
    $ionicScrollDelegate.scrollTop();

    ////////////////

    function toggleFilter(toggle) {
      vm.hideFilter = !toggle;
    }
  }

})();

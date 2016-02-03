(function () {
  'use strict';

  angular
    .module('inventory.module')
    .controller('InventoryController', InventoryController);

  InventoryController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$filter', '$ionicScrollDelegate', 'Toast', 'storage', 'money'];

  /* @ngInject */
  function InventoryController($scope, $rootScope, $state, $stateParams, $filter, $ionicScrollDelegate, Toast, storage, money) {

    /* jshint validthis: true */
    var vm = this;
    vm.property = 'InventoryController';

    // variables
    vm.storage = storage;
    vm.money = money;
    vm.currienciesCount = money.length;
    vm.showChangeLog = false;

    // functions definitions
    vm.showMore = showMore;

    // init functions
    $ionicScrollDelegate.scrollTop();

    ////////////////

    function showMore() {
      vm.showChangeLog = !vm.showChangeLog;
    }
  }
})();

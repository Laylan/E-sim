(function () {
  'use strict';

  angular
    .module('about.module', ['ionic'])
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope', '$ionicScrollDelegate', 'Toast'];

  /* @ngInject */
  function AboutController($scope, $ionicScrollDelegate, Toast) {


    var vm = this;
    vm.property = 'AboutController';

    // variables
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

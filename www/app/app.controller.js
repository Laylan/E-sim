(function () {
  'use strict';

  angular
    .module('esim-app')
    .controller('AppController', AppController);

  AppController.$inject = ['$scope', '$rootScope', '$state'];

  /* @ngInject */
  function AppController($scope, $rootScope, $state) {

    // vars
    var vm = this;
    vm.property = 'AppController';
    vm.shownGroup = null;

    // definitions
    vm.chceckPlayer = chceckPlayer;
    vm.isGroupShown = isGroupShown;
    vm.toggleGroup = toggleGroup;
    vm.cloaseGroups = cloaseGroups;
    vm.logout = logout;

    // inits
    vm.chceckPlayer();

    ////////////////

    function logout() {
      $rootScope.loggedPlayer = null;
      $rootScope.token = null;
      $rootScope.server = null;
      window.localStorage.removeItem('rememberedLogin');
      $state.go('login');
    }

    function chceckPlayer() {
      if (!$rootScope.loggedPlayer) {
        $rootScope.loggedPlayer = null;
        $rootScope.token = null;
        $rootScope.server = null;
        // $state.go('login');
      }
    }

    function isGroupShown(group) {
      return vm.shownGroup === group;
    }

    function toggleGroup(group) {
      if (vm.isGroupShown(group)) {
        vm.shownGroup = null;
      } else {
        vm.shownGroup = group;
      }
    }

    function cloaseGroups() {
      vm.shownGroup = false;
    }
  }

})();

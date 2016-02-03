(function () {
  'use strict';

  angular
    .module('inbox.module')
    .controller('InboxController', InboxController);

  InboxController.$inject = ['$scope', '$rootScope'];

  /* @ngInject */
  function InboxController($scope, dependencies) {


    var vm = this;
    vm.property = 'InboxController';

    // variables
    $scope.active = 1;

    // functions definitions
    $scope.selectTab = selectTab;
    $scope.isSelected = isSelected;

    ////////////////

    function selectTab(selectedTab) {
      $scope.active = selectedTab;
    }

    function isSelected(checkTab) {
      return $scope.active === checkTab;
    }
  }
})();

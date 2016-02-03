(function () {
  'use strict';

  angular
    .module('main.module')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$rootScope', '$ionicScrollDelegate', "$ionicModal", 'Toast', 'CitizenData', 'militaryRanks'];

  /* @ngInject */
  function MainController($scope, $rootScope, $ionicScrollDelegate, $ionicModal, Toast, CitizenData, militaryRanks) {

    // vars
    var vm = this;
    vm.property = 'MainController';

    // definitions
    vm.initAbout = initAbout;
    vm.initCitizen = initCitizen;

    vm.goAbout = goAbout;


    // inits
    $ionicScrollDelegate.scrollTop();
    CitizenData.refreshCitizen();
    vm.initCitizen();
    vm.initAbout();

    ////////////////

    function initCitizen() {
      vm.player = $rootScope.loggedPlayer;
      vm.xpToNextLvl = $rootScope.loggedPlayer.xp + $rootScope.loggedPlayer.xpToNextLvl;
      vm.dmgToNextRank = $rootScope.loggedPlayer.totalDamage + $rootScope.loggedPlayer.dmgToNextRank;
      vm.xpPercentage = Math.round(($rootScope.loggedPlayer.xp / vm.xpToNextLvl) * 100);
      vm.damagePercentage = Math.round(($rootScope.loggedPlayer.totalDamage / vm.dmgToNextRank) * 100);
    }
    function goAbout() {
      // alert('fdklasj');
      vm.modal.show();
    }


    function initAbout(){

      $ionicModal.fromTemplateUrl(
        'app/about/index.tpl.html', {
        scope: $scope
      }).then(function(modal) {
        vm.modal = modal;
      });

      vm.closeModal = function() {
        vm.modal.hide();
      };
      $scope.$on('$destroy', function() {
        vm.modal.remove();
      });
    }

  }



})();

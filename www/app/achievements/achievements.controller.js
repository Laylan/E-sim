(function () {
  'use strict';

  angular
    .module('achievements.module')
    .controller('AchievementsController', AchievementsController);

    AchievementsController.$inject = ['$scope', '$state', '$stateParams', '$ionicScrollDelegate', '$ionicModal', 'Toast', 'AchievementsData', 'achieved', 'types'];

  /* @ngInject */
  function AchievementsController($scope, $state, $stateParams, $ionicScrollDelegate, $ionicModal, Toast, AchievementsData, achieved, types) {


    var vm = this;
    vm.property = 'AchievementsController';

    // variables
    vm.showScrollTo = false;
    vm.position = $ionicScrollDelegate.getScrollPosition().top;
    vm.achieved = achieved;
    vm.types = types;

    // functions definitions
    vm.initPosition = initPosition;
    vm.scrollToTop = scrollToTop;
    vm.initModal = initModal;

    // init functions
    vm.initPosition();
    vm.scrollToTop();
    vm.initModal();

    ////////////////

    function initPosition() {
      if (vm.position >= 250) {
        vm.showScrollTo = true;
      } else if (vm.position < 250) {
        vm.showScrollTo = false;
      }
    }

    function scrollToTop() {
      $ionicScrollDelegate.scrollTop();
    }
    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/achievements/achievements-modal.tpl.html', {
          scope: $scope
        }
      ).then(function (modal) {
        vm.modal = modal;
      });
      vm.openAchievementsModal = function (a) {
        vm.currentAchiv = a;
        console.log(vm.currentAchiv);
        //console.log(JSON.stringify(vm.currentProduct));
        vm.modal.show();
      };
      vm.closeAchievementsModal = function () {
        // vm.amount = '';
        vm.modal.hide();
      };
      $scope.$on('$destroy', function () {
        vm.modal.remove();
      });
    }
  }
})();

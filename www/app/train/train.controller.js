(function () {
  'use strict';

  angular
    .module('train.module')
    .controller('TrainController', TrainController);

  TrainController.$inject = ['$scope', '$ionicModal', '$state', '$ionicScrollDelegate', 'trainData', 'TrainData', 'Toast', 'militaryRanks'];

  /* @ngInject */
  function TrainController($scope, $ionicModal, $state, $ionicScrollDelegate, trainData, TrainData, Toast, militaryRanks) {

    // vars
    var vm = this;
    vm.property = 'TrainController';
    trainData.rank = militaryRanks[trainData.rank];
    vm.trainData = trainData;

    // definitions
    vm.initModal = initModal;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.initModal();

    ////////////////

    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/train/damage-modal.tpl.html', {
          scope: $scope
        }
      ).then(function (modal) {
        vm.modal = modal;
      });
      vm.openDamageModal = function () {
        vm.modal.show();
      };
      vm.closeDamageModal = function () {
        vm.modal.hide();
      };
      vm.performTrain = function performTrain(data) {
        TrainData.performTraining()
          .then(function TrainSuccess() {
            $state.go($state.current, {}, {
              reload: true
            });
          }, function TrainFailure(msg) {
            Toast(msg);
          });
      };
      $scope.$on('$destroy', function () {
        vm.modal.remove();
      });
    }
  }

})();

(function () {
  'use strict';

  angular
    .module('work.module')
    .controller('WorkController', WorkController);

  WorkController.$inject = ['$scope', '$ionicScrollDelegate', '$ionicModal', '$state', 'WorkData', 'Toast', 'workData'];

  /* @ngInject */
  function WorkController($scope, $ionicScrollDelegate, $ionicModal, $state, WorkData, Toast, workData) {

    // vars
    var vm = this;
    vm.property = 'WorkController';
    vm.workData = workData;
    vm.initModal = initModal;
    vm.checkCompany = checkCompany;
    vm.performWork = performWork;
    vm.leaveJob = leaveJob;

    // definitions

    // inits
    vm.showProfile = showProfile;
    vm.checkCompany();
    $ionicScrollDelegate.scrollTop();
    vm.initModal();

    ////////////////

    function showProfile(id){
      $state.go('main.profile', {
        profileId: id
      });
    }

    function checkCompany() {
      if (vm.workData.company == null) {
        $state.go('main.markets.jobMarket');
      }
    }

    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/work/leave-job-modal.tpl.html', {
          scope: $scope
        }
      ).then(function (modal) {
        vm.modal = modal;
      });
      vm.leaveJobModal = function () {
        vm.modal.show();
      };
      vm.closeModal = function () {
        vm.modal.hide();
      };
      $scope.$on('$destroy', function () {
        vm.modal.remove();
      });
    }

    function performWork(data) {
      WorkData.performWork()
        .then(function WorkSuccess() {
          $state.go($state.current, {}, {
            reload: true
          });
        }, function WorkFailure(msg) {
          Toast(msg);
        });
    }

    function leaveJob() {
      WorkData.leaveJob()
        .then(function WorkSuccess() {
          $state.go($state.current, {}, {
            reload: true
          });
        }, function WorkFailure(msg) {
          Toast(msg);
        });
    }
  }

})();

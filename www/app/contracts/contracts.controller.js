(function () {
  'use strict';

  angular
    .module('contracts.module')
    .controller('ContractsController', ContractsController);

  ContractsController.$inject = ['$scope', '$state', '$rootScope', '$ionicScrollDelegate', '$ionicModal', 'Toast', 'ContractsData', 'contractsList'];

  /* @ngInject */
  function ContractsController($scope, $state, $rootScope, $ionicScrollDelegate, $ionicModal, Toast, ContractsData, contractsList) {

    // vars
    var vm = this;
    vm.property = 'ContractsController';
    var _currntPage = 0;
    var _blockFetchingNextPages = false;
    var _currentContractsCount = contractsList.length;
    var _contractsPerPage = 5;
    vm.contractsList = contractsList;
    vm.contractId = '';
    vm.ownerOfContract = false;

    // definitions
    vm.checkOwner = checkOwner;
    vm.initModal = initModal;
    vm.showProfile = showProfile;
    vm.getContract = getContract;
    vm.acceptContract = acceptContract;
    vm.cancelContract = cancelContract;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.initModal();

    ////////////////
    function checkOwner(){
      if(vm.currentContract.offerer.username === $rootScope.loggedPlayer.username){
        vm.ownerOfContract = true;
      }
    }

    function showProfile(id){
      $state.go('main.profile', {
        profileId: id
      });
    }

    function getContract() {
      console.log('getContract');
      console.log(vm.contractId);
      ContractsData.fetchContract(vm.contractId)
        .then(function FetchContractSuccess(data) {
          console.log('succes');
          console.log(data);
          vm.currentContract = data;
          vm.checkOwner();
        }, function FetchContractError(error) {
          console.log(errrooorrrsss);
          Toast(error);
        });
    }

    function acceptContract() {
      console.log('akceptacja kontraktu');
      ContractsData.accept(vm.currentContract.id)
        .then(function Success() {
          $state.go('main.contracts');
          vm.closeTransactionModal();
        }, function Error(msg) {
          Toast(msg);
        });
    }

    function cancelContract() {
      // koniecznie okienko do upeniania sie!!!!!
      console.log('anulowanie kontraktu');
      ContractsData.cancel(vm.currentContract.id)
        .then(function Success() {
          $state.go('main.contracts');
          vm.closeTransactionModal();
        }, function Error(msg) {
          Toast(msg);
        });
    }


    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/contracts/transaction-modal.tpl.html', {
          scope: $scope
        }
      ).then(function (modal) {
        vm.modal = modal;
      });
      vm.openTransactionModal = function (id) {
        vm.contractId = id;
         vm.getContract();
        // vm.currentContract = contract;
      //  console.log('currentContract '+vm.currentContract);
        vm.modal.show();
      };
      vm.closeTransactionModal = function () {
        vm.modal.hide();
      };

      $scope.$on('$destroy', function () {
        vm.modal.remove();
      });
    }
  }

})();

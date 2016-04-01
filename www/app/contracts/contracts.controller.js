(function () {
  'use strict';

  angular
    .module('contracts.module')
    .controller('ContractsController', ContractsController);

  ContractsController.$inject = ['$scope', '$state', '$rootScope', '$ionicScrollDelegate', '$ionicModal', '$ionicActionSheet','Toast', 'ContractsData', 'pendingContractsList', 'offeredContractsList'];

  /* @ngInject */
  function ContractsController($scope, $state, $rootScope, $ionicScrollDelegate, $ionicModal, $ionicActionSheet, Toast, ContractsData, pendingContractsList, offeredContractsList) {

    // vars
    var vm = this;
    vm.property = 'ContractsController';
    var _currntPage = 0;
    var _blockFetchingNextPages = false;
    var _currentContractsCount = pendingContractsList.length;
    var _contractsPerPage = 5;
    vm.pendingContractsList = pendingContractsList;
    vm.offeredContractsList = offeredContractsList;
    vm.contractId = '';
    vm.ownerOfContract = false;

    // definitions
    vm.checkOwner = checkOwner;
    vm.initModal = initModal;
    vm.showProfile = showProfile;
    vm.showYourTemplates = showYourTemplates;
    vm.getContract = getContract;
    vm.acceptContract = acceptContract;
    vm.declineContract = declineContract;
    vm.cancelContract = cancelContract;
    vm.refreshPendingContracts = refreshPendingContracts;
    vm.refreshOfferedContracts = refreshOfferedContracts;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.initModal();

    ////////////////
    function checkOwner(){
      if(vm.currentContract.offerer.username === $rootScope.loggedPlayer.username){
        vm.ownerOfContract = true;
      }
      console.log('$$$$$$Contract owner: '+vm.ownerOfContract);
    }

    function showProfile(id){
      $state.go('main.profile', {
        profileId: id
      });
    }
    function showYourTemplates() {
      console.log('idz do tempatek');
      $state.go('main.contractsTpl');
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
          console.log('errrooorrrsss');
          Toast(error);
        });
    }

    function acceptContract() {
      console.log('akceptacja kontraktu');
      ContractsData.accept(vm.currentContract.id)
        .then(function Success() {
          vm.refreshPendingContracts();
          $state.go('main.contracts');
          vm.closeTransactionModal();
        }, function Error(msg) {
          Toast(msg);
        });

    }

    function declineContract() {
      console.log('anulowanie kontraktu');
      var hideSheet = $ionicActionSheet.show({
        destructiveText: 'Delete',
        titleText: 'Decline offer?',
        cancelText: 'Cancel',
        destructiveButtonClicked: function(index) {
          ContractsData.decline(vm.currentContract.id)
            .then(function Success() {
              vm.refreshPendingContracts();
              $state.go('main.contracts');
              vm.closeTransactionModal();
            }, function Error(msg) {
              Toast(msg);
            });
            return true;
          }
        });
    }
    function cancelContract() {
      console.log('anulowanie kontraktu');
      var hideSheet = $ionicActionSheet.show({
        destructiveText: 'Delete',
        titleText: 'Cancel offer?',
        cancelText: 'Cancel',
        destructiveButtonClicked: function(index) {
          ContractsData.cancel(vm.currentContract.id)
            .then(function Success() {
              vm.refreshOfferedContracts();
              $state.go('main.contracts');
              vm.closeTransactionModal();
            }, function Error(msg) {
              Toast(msg);
            });
            return true;
          }
        });
    }
    function refreshPendingContracts() {
      ContractsData.fetchPendingContracts()
        .then(function FetchJobOffersSuccess(data) {
          vm.pendingContractsList = data;
        }, function FetchJobOffersError(error) {
          Toast(error);
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }
    function refreshOfferedContracts() {
      ContractsData.fetchOfferedContracts()
        .then(function FetchJobOffersSuccess(data) {
          vm.offeredContractsList = data;
        }, function FetchJobOffersError(error) {
          Toast(error);
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
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

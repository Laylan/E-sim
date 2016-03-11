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

    // definitions
    vm.initModal = initModal;
    vm.showProfile = showProfile;
    vm.getContract = getContract;
    vm.acceptContract = acceptContract;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.initModal();
    console.log('Welcome to contracts!!!!');
    console.log(vm.contractsList);

    ////////////////

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
        }, function FetchContractError(error) {
          console.log(errrooorrrsss);
          Toast(error);
        });
    }

    function acceptContract() {
      ContractsData.accept(vm.currentContract.id)
        .then(function Success() {
          $state.go('main.contracts');
          vm.closeTransactionModal();
        }, function Error(msg) {
          Toast(msg);
        });
    }
    // function getMore() {
    //   ProductMarketData.fetchProducts(++_currntPage, vm.countryId, vm.quality, vm.resource)
    //     .then(function FetchJobOffersSuccess(data) {
    //       vm.products = vm.products.concat(data);
    //       _currentProductCount = data.length;
    //     }, function FetchJobOffersError(error) {
    //       Toast(error);
    //       _blockFetchingNextPages = true;
    //     })
    //     .then(function BroadcastFinish() {
    //       $scope.$broadcast('scroll.infiniteScrollComplete');
    //     });
    // }
    //
    // function canGetMoreOffer() {
    //   return _currentProductCount === _productsPerPage && !_blockFetchingNextPages;
    // }

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
        console.log('currentContract '+vm.currentContract);
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

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
          vm.currentContract = data;
        }, function FetchAuctionError(error) {
          Toast(error);
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
      vm.openTransactionModal = function (contract) {
        vm.getContract();
        // vm.currentContract = contract;
        console.log(vm.currentContract);
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

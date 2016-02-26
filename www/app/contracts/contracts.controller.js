(function () {
  'use strict';

  angular
    .module('contracts-market.module')
    .controller('ContractsController', ContractsController);

  ContractsController.$inject = ['$scope', '$state', '$rootScope', '$ionicScrollDelegate', '$ionicModal', 'ContractsData'];

  /* @ngInject */
  function ContractsController($scope, $state, $rootScope, $ionicScrollDelegate, $ionicModal, ContractsData) {

    // vars
    var vm = this;
    vm.property = 'ContractsController';
    var _currntPage = 0;
    var _blockFetchingNextPages = false;
    var _currentProductCount = products.length;
    var _productsPerPage = 5;

    // definitions

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.initModal();

    ////////////////

    function showProfile(id, type) {
      switch (type) {
        case "CITIZEN":
          $state.go('main.profile', {
            profileId: id
          });
          break;

        case "STOCK_COMPANY":
          $state.go('main.profileSc', {
            companyId: id
          });
          break;
        default:
          break;
      }
    }

    function yourProductOffers() {
      $state.go('main.productOffers');
    }

    function getMore() {
      ProductMarketData.fetchProducts(++_currntPage, vm.countryId, vm.quality, vm.resource)
        .then(function FetchJobOffersSuccess(data) {
          vm.products = vm.products.concat(data);
          _currentProductCount = data.length;
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    function canGetMoreOffer() {
      return _currentProductCount === _productsPerPage && !_blockFetchingNextPages;
    }

    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/markets/productMarket/transaction-modal.tpl.html', {
          scope: $scope
        }
      ).then(function (modal) {
        vm.modal = modal;
      });
      vm.openTransactionModal = function (product) {
        vm.currentProduct = product;
        console.log(vm.currentProduct);
        //console.log(JSON.stringify(vm.currentProduct));
        vm.modal.show();
      };
      vm.closeTransactionModal = function () {
        vm.amount = '';
        vm.modal.hide();
      };
      vm.CanBuy = false;

      //(vm.amount * vm.currentProduct.price ) <= vm.money[vm.currentProduct.countryId].ammount;

      $scope.$on('$destroy', function () {
        vm.modal.remove();
      });
    }
  }

})();

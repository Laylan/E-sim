(function () {
  'use strict';

  angular
    .module('product-market.module')
    .controller('ProductMarketController', ProductMarketController);

  ProductMarketController.$inject = ['$scope', '$state', '$rootScope', '$ionicScrollDelegate', '$ionicModal', 'products', 'current', 'countryList', 'ProductMarketData', 'money'];

  /* @ngInject */
  function ProductMarketController($scope, $state, $rootScope, $ionicScrollDelegate, $ionicModal, products, current, countryList, ProductMarketData, money) {

    // vars
    var vm = this;
    vm.property = 'ProductMarketController';
    var _currntPage = 0;
    var _blockFetchingNextPages = false;
    var _currentProductCount = products.length;
    var _productsPerPage = 5;
    vm.quality = '0';
    vm.resource = '';
    vm.countryList = countryList;
    vm.current = current; //curren position of player
    vm.countryId = current.occupant.countryId;
    vm.products = products;
    vm.amount = '';
    vm.money = money;

    // definitions
    vm.showProfile = showProfile;
    vm.buy = buy;
    vm.filter = filter;
    vm.getMore = getMore;
    vm.canGetMoreOffer = canGetMoreOffer;
    vm.initModal = initModal;
    vm.yourProductOffers = yourProductOffers;

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

    function buy() {
      ProductMarketData.deal(vm.amount, vm.currentProduct.offerId)
        .then(function Success() {
          $state.go('main.productMarket');
          vm.closeTransactionModal();
        }, function Error(msg) {
          Toast(msg);
        });

      // alert('soooon');
    }

    function filter() {
      _currntPage = 0;
      ProductMarketData.fetchProducts(_currntPage, vm.countryId, vm.quality, vm.resource)
        .then(function FetchJobOffersSuccess(data) {
          vm.products = data;
          _currentProductCount = data.length;
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        });

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

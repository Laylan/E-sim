(function() {
  'use strict';

  angular
    .module('product-offers.module')
    .controller('ProductOffersController', ProductOffersController);

  ProductOffersController.$inject = ['$scope', '$state', '$filter', '$ionicScrollDelegate', '$rootScope', '$ionicModal', '$ionicActionSheet', '$timeout', 'Toast', 'ProductOffersData', 'ResourcesData', 'myProductOffers', 'currienciesList', 'current', 'countryList'];

  /* @ngInject */
  function ProductOffersController($scope, $state, $filter, $ionicScrollDelegate, $rootScope, $ionicModal, $ionicActionSheet, $timeout, Toast, ProductOffersData, ResourcesData, myProductOffers, currienciesList, current, countryList) {

    // vars
    var vm = this;
    vm.property = 'ProductOffersController';
    var tmp = '';
    var _currntPage = 1;
    var _blockFetchingNextPages = false;
    var _currentProductCount = myProductOffers.length;
    var _productsPerPage = 5;
    vm.quality = '';
    vm.storage = [];
    vm.resource = '';
    vm.countryList = countryList;
    vm.current = current; //curren position of player
    vm.countryId = current.occupant.countryId;
    vm.myProductOffers = myProductOffers;
    vm.amount = '';
    vm.currienciesList = currienciesList;
    vm.price = '';
    vm.product = '';

    // definitions
    vm.initModal = initModal;
    vm.createNew = createNew;
    vm.deleteOffer = deleteOffer;
    vm.getMore = getMore;
    vm.canGetMoreOffer = canGetMoreOffer;
    vm.updateStorage = updateStorage;
    vm.refreshData = refreshData;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.initModal();

    ////////////////

    function createNew() {
      vm.resource = vm.product.resource;
      vm.quality = vm.product.quality + '';

      ProductOffersData.createNewProductOffer(vm.resource, vm.quality, vm.amount, vm.countryId, vm.price)
        .then(function Success() {
          _currntPage = 0;
          ProductOffersData.fetchMyProductOffers(++_currntPage)
            .then(function(data) {
                vm.refreshData();
              },
              function(err) {
                Tost('Something went terribly wrong');
              });

          vm.closeOfferModal();

        }, function Error(msg) {

          Toast(msg);
        });
    }

    function deleteOffer(offerId) {
      console.log(offerId);
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        destructiveText: 'Delete',
        titleText: 'Delete offer?',
        cancelText: 'Cancel',
        destructiveButtonClicked: function(index) {
          ProductOffersData.removeProductOffer(offerId)
            .then(function Success() {
                vm.refreshData();
            }, function FetchProductOfferError(error) {
              Toast(error);
              _blockFetchingNextPages = true;
            });
          return true;
        }
      });


    }

    function refreshData() {
      _currntPage = 0;
      ProductOffersData.fetchMyProductOffers(++_currntPage)
        .then(function FetchJobOffersSuccess(data) {
          vm.myProductOffers = data;
          _currentProductCount = data.length;
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    function getMore() {
      ProductOffersData.fetchMyProductOffers(++_currntPage)
        .then(function FetchJobOffersSuccess(data) {
          vm.myProductOffers = vm.myProductOffers.concat(data);
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

    function updateStorage() {
      ResourcesData.fetchAllResources()
        .then(function FetchResourcesSuccess(data) {
          vm.storage = data;
          console.log(data);
          console.log('open modal');
          console.log(vm.storage);
          vm.modal.show();
        }, function FetchResourcesError(error) {
          Toast(error);
        });
    }


    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/markets/productMarket/productOffers/offer-modal.tpl.html', {
          scope: $scope
        }
      ).then(function(modal) {
        vm.modal = modal;
      });
      vm.openOfferModal = function() {
        vm.updateStorage();
        vm.modal.show();
      };
      vm.closeOfferModal = function() {
        //  vm.number = '';
        vm.modal.hide();
      };
      $scope.$on('$destroy', function() {
        vm.modal.remove();
      });
    }
  }

})();

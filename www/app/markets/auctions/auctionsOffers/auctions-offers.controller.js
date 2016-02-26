(function() {
  'use strict';

  angular
    .module('auctions-offers.module')
    .controller('AuctionsOffersController', AuctionsOffersController);

  AuctionsOffersController.$inject = ['$scope', '$state', '$filter', '$ionicScrollDelegate', '$rootScope', '$ionicModal', '$ionicActionSheet', '$timeout', 'Toast', 'AuctionsOffersData', 'myAuctionsOffers'];

  /* @ngInject */
  function AuctionsOffersController($scope, $state, $filter, $ionicScrollDelegate, $rootScope, $ionicModal, $ionicActionSheet, $timeout, Toast, AuctionsOffersData, myAuctionsOffers) {

    // vars
    var vm = this;
    vm.property = 'AuctionsOffersController';
    var tmp = '';
    var _currntPage = 1;
    var _blockFetchingNextPages = false;
    //var _currentOffersCount = myAuctionsOffers.length;
    var _productsPerPage = 5;
    vm.auctionsNumber = myAuctionsOffers.length;
    vm.myAuctions = myAuctionsOffers;

    // definitions
    //vm.initModal = initModal;
    vm.createNew = createNew;
    vm.deleteOffer = deleteOffer;
    vm.getMore = getMore;
    vm.canGetMoreOffer = canGetMoreOffer;

    // inits
    $ionicScrollDelegate.scrollTop();
  //  vm.initModal();

    ////////////////

    function createNew() {
      alert("This function is not implemented yet. This project is OPEN SOURCE, you can join it and implement this function!\nLink to project in 'about' section.");
      // vm.resource = vm.product.resource;
      // vm.quality = vm.product.quality + '';
      //
      // ProductOffersData.createNewProductOffer(vm.resource, vm.quality, vm.amount, vm.countryId, vm.price)
      //   .then(function Success() {
      //     _currntPage = 0;
      //     ProductOffersData.fetchMyProductOffers(++_currntPage)
      //       .then(function(data) {
      //           vm.refreshData();
      //         },
      //         function(err) {
      //           Tost('Something went terribly wrong');
      //         });
      //
      //     vm.closeOfferModal();
      //
      //   }, function Error(msg) {
      //
      //     Toast(msg);
      //   });
    }

    function deleteOffer(offerId) {
        alert("This function is not implemented yet. This project is OPEN SOURCE, you can join it and implement this function!\nLink to project in 'about' section.");

    }

    function getMore() {
      alert("This function is not implemented yet. This project is OPEN SOURCE, you can join it and implement this function!\nLink to project in 'about' section.");
      // ProductOffersData.fetchMyProductOffers(++_currntPage)
      //   .then(function FetchJobOffersSuccess(data) {
      //     vm.myProductOffers = vm.myProductOffers.concat(data);
      //     _currentProductCount = data.length;
      //   }, function FetchJobOffersError(error) {
      //     Toast(error);
      //     _blockFetchingNextPages = true;
      //   })
      //   .then(function BroadcastFinish() {
      //     $scope.$broadcast('scroll.infiniteScrollComplete');
      //   });
    }

    function canGetMoreOffer() {
      return _currentProductCount === _productsPerPage && !_blockFetchingNextPages;
    }


    // function initModal() {
    //   $ionicModal.fromTemplateUrl(
    //     'app/markets/productMarket/productOffers/offer-modal.tpl.html', {
    //       scope: $scope
    //     }
    //   ).then(function(modal) {
    //     vm.modal = modal;
    //   });
    //   vm.openOfferModal = function() {
    //     vm.updateStorage();
    //     vm.modal.show();
    //   };
    //   vm.closeOfferModal = function() {
    //     //  vm.number = '';
    //     vm.modal.hide();
    //   };
    //   $scope.$on('$destroy', function() {
    //     vm.modal.remove();
    //   });
    // }
  }

})();

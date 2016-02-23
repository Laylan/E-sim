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
    //var _currentProductCount = myProductOffers.length;
    var _productsPerPage = 5;
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
      //console.log(offerId);
      // Show the action sheet
      // var hideSheet = $ionicActionSheet.show({
      //   destructiveText: 'Delete',
      //   titleText: 'Delete offer?',
      //   cancelText: 'Cancel',
      //   destructiveButtonClicked: function(index) {
      //     ProductOffersData.removeProductOffer(offerId)
      //       .then(function Success() {
      //           vm.refreshData();
      //       }, function FetchProductOfferError(error) {
      //         Toast(error);
      //         _blockFetchingNextPages = true;
      //       });
      //     return true;
      //   }
      // });
    }

    function getMore() {
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

(function() {
  'use strict';

  angular
    .module('auctions-offers.module')
    .controller('AuctionsOffersController', AuctionsOffersController);

  AuctionsOffersController.$inject = ['$scope', '$state', '$filter', '$ionicScrollDelegate', '$rootScope', '$ionicModal', '$ionicActionSheet', '$timeout', 'Toast', 'AuctionsOffersData', 'myAuctionsOffers', 'ResourcesData'];

  /* @ngInject */
  function AuctionsOffersController($scope, $state, $filter, $ionicScrollDelegate, $rootScope, $ionicModal, $ionicActionSheet, $timeout, Toast, AuctionsOffersData, myAuctionsOffers, ResourcesData) {

    // vars
    var vm = this;
    vm.property = 'AuctionsOffersController';
    var tmp = '';
    var _currntPage = 1;
    var _blockFetchingNextPages = false;
    var _currentAuctionsCount = myAuctionsOffers.length;
    var _productsPerPage = 5;
    vm.auctionsNumber = myAuctionsOffers.length;
    vm.myAuctions = myAuctionsOffers;
    vm.myEquipment = [];
    vm.item = '';
    vm.price = '';

    // definitions
    vm.initModal = initModal;
    vm.createNew = createNew;
    vm.deleteOffer = deleteOffer;
    vm.refreshData = refreshData;
    vm.getMore = getMore;
    vm.canGetMoreOffer = canGetMoreOffer;
    vm.updateEquipment = updateEquipment;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.initModal();
    console.log('myEquipment ' + vm.myEquipment);

    ////////////////

    function createNew() {
      //alert("This function is not implemented yet. This project is OPEN SOURCE, you can join it and implement this function!\nLink to project in 'about' section.");
      //vm.item = vm.product.resource;
      //vm.quality = vm.product.quality + '';

      AuctionsOffersData.createNewAuctionOffer(vm.item, vm.price)
        .then(function Success() {
          _currntPage = 0;
          AuctionsOffersData.fetchMyAuctions(++_currntPage)
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
        //alert("This function is not implemented yet. This project is OPEN SOURCE, you can join it and implement this function!\nLink to project in 'about' section.");
        console.log(offerId);
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
          destructiveText: 'Delete',
          titleText: 'Delete offer?',
          cancelText: 'Cancel',
          destructiveButtonClicked: function(index) {
            AuctionsOffersData.removeAuctionOffer(offerId)
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
    function refreshData(){
      _currntPage = 0;
      AuctionsOffersData.fetchMyAuctions(++_currntPage)
        .then(function FetchAuctionOffersSuccess(data) {
          vm.myAuctions = data;
          _currentAuctionsCount = data.length;
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    function getMore() {
      alert("This function is not implemented yet. This project is OPEN SOURCE, you can join it and implement this function!\nLink to project in 'about' section.");
      AuctionsOffersData.fetchMyAuctions(++_currntPage)
        .then(function FetchJobOffersSuccess(data) {
          vm.myAuctions = vm.myAuctions.concat(data);
          _currentAuctionsCount = data.length;
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    function canGetMoreOffer() {
      return _currentAuctionsCount === _itemsPerPage && !_blockFetchingNextPages;
    }

    function updateEquipment() {
      ResourcesData.fetchMyEquipmentOff()
        .then(function FetchEquipmentSuccess(data) {
          vm.myEquipment = data;
          console.log(data);
          console.log('open modal');
          console.log(vm.myEquipment);
          vm.modal.show();
        }, function FetchEquipmentError(error) {
          Toast(error);
        });
    }

    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/markets/auctions/auctionsOffers/offer-modal.tpl.html', {
          scope: $scope
        }
      ).then(function(modal) {
        vm.modal = modal;
      });
      vm.openOfferModal = function() {
        vm.updateEquipment();
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

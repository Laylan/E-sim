(function () {
  'use strict';

  angular
    .module('auctions.module')
    .controller('AuctionsController', AuctionsController);

  AuctionsController.$inject = ['$scope', '$state', '$rootScope','$filter', '$ionicScrollDelegate', '$ionicModal', 'Toast', 'AuctionsData', 'auctions', 'money'];

  /* @ngInject */
  function AuctionsController($scope, $state, $rootScope, $filter, $ionicScrollDelegate, $ionicModal, Toast, AuctionsData, auctions, money) {

    // vars
    var vm = this;
    vm.property = 'AuctionsController';
    var _currntPage = 0;
    var _blockFetchingNextPages = false;
    var _currentAuctionsCount = auctions.length;
    var _auctionsPerPage = 10;
    var date = new Date();
    vm.auctions = auctions;
    vm.money = money;
    vm.player = $rootScope.loggedPlayer;
    vm.type = '';
    vm.progress = 'IN_PROGRESS';
    vm.sorted = 'TIME';
    vm.currentAuction = null;
    vm.price = '';
    vm.auctionId = '';
    vm.countdownTime = (vm.auctions[0].milisLeftTimestamp/1000);

    // definitions
    vm.filter = filter;
    vm.showYourAuctions = showYourAuctions;
    vm.showProfile = showProfile;
    vm.getAuction = getAuction;
    vm.canGetMoreAuctions = canGetMoreAuctions;
    vm.getMore = getMore;
    vm.initModal = initModal;
    vm.bid = bid;
    vm.remove = remove;

    // inits
    vm.initModal();
    ////////////////

    function filter() {
      _currntPage = 0;
      console.log('fliter');
      console.log(vm.progress);
      console.log(vm.sorted);
      console.log(vm.type);
      AuctionsData.fetchAuctions(_currntPage, vm.progress, vm.sorted, vm.type)
        .then(function FetchAuctionOffersSuccess(data) {
          vm.auctions = data;
          _currentAuctionsCount = data.length;
        }, function FetchAuctionOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        });
    }
    function showYourAuctions() {
      console.log('idz do aukcji');
      $state.go('main.auctionsOffers');
    }
    function showProfile(id){
      $state.go('main.profile', {
        profileId: id
      });
    }

    function getAuction() {
      console.log('getAuction');
      console.log(vm.auctionId);
      AuctionsData.fetchAuction(vm.auctionId)
        .then(function FetchAuctionSuccess(data) {
          vm.currentAuction = data;
        }, function FetchAuctionError(error) {
          Toast(error);
        });
    }

    function bid() {
      if(vm.price === ''){
        vm.price = vm.currentAuction.minimalOutbid;
      }
      AuctionsData.bid(vm.currentAuction.id, vm.price)
        .then(function Success() {
          $state.go('main.markets.auctions');
          vm.closeTransactionModal();
        }, function Error(msg) {
          Toast(msg);
        });
    }

    function remove() {
      AuctionsData.remove(vm.currentAuction.id)
        .then(function Success() {
          $state.go('main.markets.auctions');
          vm.closeTransactionModal();
        }, function Error(msg) {
          Toast(msg);
        });
    }

    function getMore() {
      AuctionsData.fetchAuctions(++_currntPage, vm.progress, vm.sorted, vm.type)
        .then(function FetchAuctionOffersSuccess(data) {
          vm.auctions = vm.auctions.concat(data);
          _currentAuctionsCount = data.length;
        }, function FetchAuctionOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    function canGetMoreAuctions() {
      return _currentAuctionsCount === _auctionsPerPage && !_blockFetchingNextPages;
    }

    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/markets/auctions/transaction-modal.tpl.html', {
          scope: $scope
        }
      ).then(function (modal) {
        vm.countdownTime = 90;
        vm.modal = modal;
      });

      vm.openTransactionModal = function(id) {
        vm.auctionId = id;
        vm.getAuction();
        //vm.countdownTime = parseInt(vm.currentAuction.milisLeftTimestamp);
        console.log('currentAuction');
        console.log(vm.currentAuction);
        vm.modal.show();
      };

      vm.closeTransactionModal = function () {
        vm.price = '';
        vm.modal.hide();
      };

      $scope.$on('$destroy', function () {
        vm.modal.remove();
      });
    }
  }

})();

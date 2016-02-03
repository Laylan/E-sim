(function () {
  'use strict';

  angular
    .module('auctions.module')
    .controller('AuctionsController', AuctionsController);

  AuctionsController.$inject = ['$scope', '$state', '$ionicScrollDelegate', '$ionicModal', 'Toast', 'AuctionsData', 'auctions', 'money'];

  /* @ngInject */
  function AuctionsController($scope, $state, $ionicScrollDelegate, $ionicModal, Toast, AuctionsData, auctions, money) {

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
    vm.type = '';
    vm.progress = 'IN_PROGRESS';
    vm.sorted = 'TIME';
    vm.currentAuction = null;
    vm.price = 0;

    // definitions
    vm.filter = filter;
    vm.showProfile = showProfile;
    vm.canGetMoreAuctions = canGetMoreAuctions;
    vm.getMore = getMore;
    vm.initModal = initModal;
    vm.bid = bid;

    // inits
    vm.initModal();

    ////////////////

    function filter() {

    }
    function showProfile(id){
      $state.go('main.profile', {
        profileId: id
      });
    }

    function bid() {
      AuctionsData.bid(vm.currentAuction.id, vm.price)
        .then(function Success() {
          $state.go('main.auctions');
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
        vm.modal = modal;
      });

      vm.openTransactionModal = function(auction) {
        vm.currentAuction = auction;
        console.log(vm.currentAuction);
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

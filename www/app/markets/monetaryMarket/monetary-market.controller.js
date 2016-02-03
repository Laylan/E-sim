(function () {
  'use strict';

  angular
    .module('monetary-market.module')
    .controller('MonetaryMarketController', MonetaryMarketController);

  MonetaryMarketController.$inject = ['$scope', '$state', '$filter', '$ionicScrollDelegate', '$rootScope', '$ionicModal', 'Toast', 'MonetaryMarketData', 'offers', 'currienciesList', 'money'];

  /* @ngInject */
  function MonetaryMarketController($scope, $state, $filter, $ionicScrollDelegate, $rootScope, $ionicModal, Toast, MonetaryMarketData, offers, currienciesList, money) {

    // vars
    var vm = this;
    vm.property = 'MonetaryMarketController';
    var tmp = '';
    var _currntPage = 0;
    var _blockFetchingNextPages = false;
    var _currentOffersCount = offers.length;
    var _offersPerPage = 5;
    vm.currienciesList = currienciesList;
    vm.buyerCurrencyId = "0"; //castowanie na stringa
    vm.sellerCurrencyId = $rootScope.loggedPlayer.citizenshipId + ''; //castowanie na stringa
    vm.offers = offers;
    vm.number = '';
    vm.money = money;

    // definitions
    vm.initModal = initModal;
    vm.showProfile = showProfile;
    vm.buy = buy;
    vm.swapCurriencies = swapCurriencies;
    vm.getOffers = getOffers;
    vm.getMore = getMore;
    vm.canGetMoreOffer = canGetMoreOffer;
    vm.yourOffers = yourOffers;

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
    function yourOffers() {
      $state.go('main.monetaryOffers');
    }
    function buy() {
      MonetaryMarketData.deal(vm.number, vm.currentOffer.offerId)
        .then(function Success() {
          // $state.go('main.markets.monetaryMarket');
          vm.closeTransactionModal();

        }, function Error(msg) {
          Toast(msg);
        });
    }

    function swapCurriencies() {
      tmp = vm.buyerCurrencyId;
      vm.buyerCurrencyId = vm.sellerCurrencyId;
      vm.sellerCurrencyId = tmp;
    }

    function getOffers() {
      _currntPage = 0;
      MonetaryMarketData.fetchOffers(_currntPage, vm.buyerCurrencyId, vm.sellerCurrencyId)
        .then(function FetchJobOffersSuccess(data) {
          vm.offers = data;
          if (data.length === 0) {
            Toast('No offers!');
          }
          _currentOffersCount = data.length;
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        });
    }

    function getMore() {
      MonetaryMarketData.fetchOffers(++_currntPage, vm.buyerCurrencyId, vm.sellerCurrencyId)
        .then(function FetchJobOffersSuccess(data) {
          vm.offers = vm.offers.concat(data);
          _currentOffersCount = data.length;
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        })
        .then(function BroadcastFinish() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    function canGetMoreOffer() {
      return _currentOffersCount === _offersPerPage && !_blockFetchingNextPages;
    }

    function initModal() {
      $ionicModal.fromTemplateUrl(
        'app/markets/monetaryMarket/transaction-modal.tpl.html', {
          scope: $scope
        }
      ).then(function (modal) {
        vm.modal = modal;
      });
      vm.openTransactionModal = function (offer) {
        console.log('open modal');
        vm.currentOffer = offer;
        vm.modal.show();
      };
      vm.closeTransactionModal = function () {
        vm.number = '';
        vm.modal.hide();
      };
      $scope.$on('$destroy', function () {
        vm.modal.remove();
      });
    }
  }

})();

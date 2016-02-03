(function() {
  'use strict';

  angular
    .module('monetary-offers.module')
    .controller('MonetaryOffersController', MonetaryOffersController);

  MonetaryOffersController.$inject = ['$scope', '$state', '$filter', '$ionicScrollDelegate', '$rootScope', '$ionicModal', 'Toast', 'MonetaryOffersData', 'myOffers', 'currienciesList', 'money'];

  /* @ngInject */
  function MonetaryOffersController($scope, $state, $filter, $ionicScrollDelegate, $rootScope, $ionicModal, Toast, MonetaryOffersData, myOffers, currienciesList, money) {

    // vars
    var vm = this;
    vm.property = 'MonetaryOffersController';
    var tmp = '';
    var _currntPage = 1;
    var _blockFetchingNextPages = false;
    var _currentOffersCount = myOffers.length;
    var _offersPerPage = 5;
    vm.currienciesList = currienciesList;
    vm.buyCurrencyId = "0"; //castowanie na stringa
    vm.offeredCurrencyId = $rootScope.loggedPlayer.citizenshipId + ''; //castowanie na stringa
    vm.myOffers = myOffers;
    vm.amount = '';
    vm.ratio = "0";
    vm.money = money;

    // definitions
    vm.initModal = initModal;
    vm.createNew = createNew;
    vm.swapCurriencies = swapCurriencies;
    vm.deleteOffer = deleteOffer;
    vm.getMore = getMore;
    vm.canGetMoreOffer = canGetMoreOffer;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.initModal();

    ////////////////

    function createNew() {
      console.log(vm.buyCurrencyId);
      console.log(vm.offeredCurrencyId);
      console.log(vm.ratio);
      console.log(vm.amount);
      MonetaryOffersData.createOwn(vm.amount, vm.offeredCurrencyId, vm.buyCurrencyId, vm.ratio)
        .then(function Success() {
          console.log('wszystko ok');
          _currntPage=0;
          MonetaryOffersData.fetchMyOffers(++_currntPage)
          .then(function(data){
            vm.myOffers  = data;
            vm.closeOfferModal();
          },
          function(err){
            Tost('Somthing went terribly wrong');
          } );
          // $state.go('main.markets.monetaryMarket');
          //vm.closeOfferModal();

        }, function Error(msg) {
          console.log('error');
          Toast(msg);
        });

    }

    function swapCurriencies() {
      tmp = vm.buyCurrencyId;
      vm.buyCurrencyId = vm.offeredCurrencyId;
      vm.offeredCurrencyId = tmp;
    }

    function deleteOffer(offerId) {
      console.log(offerId);
      MonetaryOffersData.removeOffer(offerId)
        .then(function Success() {
          MonetaryOffersData.fetchMyOffers(1)
            .then(function FetchJobOffersSuccess(data) {
              _currentOffersCount = data.length;
              vm.myOffers = data;
            }, function FetchJobOffersError(error) {
              Toast(error);
            });
        }, function FetchJobOffersError(error) {
          Toast(error);
          _blockFetchingNextPages = true;
        });
    }

    function getMore() {
      MonetaryOffersData.fetchMyOffers(++_currntPage)
        .then(function FetchJobOffersSuccess(data) {
          vm.myOffers = vm.myOffers.concat(data);
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
        'app/markets/monetaryMarket/monetaryOffers/offer-modal.tpl.html', {
          scope: $scope
        }
      ).then(function(modal) {
        vm.modal = modal;
      });
      vm.openOfferModal = function() {
        console.log('open modal');
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

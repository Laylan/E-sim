(function() {
  'use strict';

  angular
    .module('specialItem.module')
    .controller('SpecialItemController', SpecialItemController);

  SpecialItemController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$filter', '$ionicScrollDelegate', 'Toast', 'SpecialItemData', 'specialItem'];

  /* @ngInject */
  function SpecialItemController($scope, $rootScope, $state, $stateParams, $filter, $ionicScrollDelegate, Toast, SpecialItemData, specialItem) {

    // vars
    var vm = this;
    var sieve;      //na końcu jest przypisanie $filtru do tego initFilters()

    // definitions
    vm.property = 'SpecialItemController';
    vm.SpecialItemData = SpecialItemData;
    vm.specialItem = specialItem;
    vm.usedSpecialItem = usedSpecialItem;
    vm.initFilters = initFilters;
    vm.selectedSpecialItem = null;
    vm.consumeSpecialItem = consumeSpecialItem;

    vm.initFilters();

    function usedSpecialItem() {
      var usedSpecialItems = sieve(vm.specialItem, {
        used: 'true'
      });
      vm.usedSpecialItem = usedSpecialItems;
      var usedSpecialItems = sieve(vm.specialItem, {
        used: 'true'
      });
      vm.usedSpecialItem = usedSpecialItems;
    }

    vm.usedSpecialItem();

    function consumeSpecialItem(item) {
      if (!item) {
        Toast('There is no selected item!');
      } else if (item) {
        SpecialItemData.useSpecialItem(item)
          .then(function consumeSpecialItemSucess(data) {}, function consumeSpecialItemFailure(msg) {
            Toast(msg);
          });
      } else {
        specialItems.useSpecialItem(item)
          .then(function ConsumeFoodSuccess(data) {
            vm.usedSpecialItems();

            vm.usedSpecialItems();
          }, function ConsumeFoodFailure(msg) {
            Toast(msg);
          });
      }
    }

    function updateSpecialItem(nextUsageTime) {
      SpecialItemData.fetchSpecialItems(nextUsageTime)
        .then(function fetchSpecialItemsSucces(data) {
          currentDate = data;
        }, function fetchSpecialItemsError(error) {
          Toast(error);
        });
    };

    function initFilters() {
      sieve = $filter('filter');
    };
  }
})();

(function() {
  'use strict';

  angular
    .module('fight.module')
    .controller('FightController', FightController);

  FightController.$inject = ['$scope', '$rootScope', '$filter', '$ionicScrollDelegate', 'fight', '$ionicModal', 'Toast', 'ResourcesData', 'storage', 'FightData', 'limits'];

  /* @ngInject */
  function FightController($scope, $rootScope, $filter, $ionicScrollDelegate, fight, $ionicModal, Toast, ResourcesData, storage, FightData, limits) {

    // vars
    var vm = this;
    vm.property = 'FightController';
    var sieve;
    var sortArray;
    vm.weapons = {};
    vm.consumeObject = {};
    vm.selectedWeapon = 'w0';
    vm.selectedItem = null;
    vm.fightData = null;
    vm.currentFight = fight;
    vm.giftLimit = limits.giftLimit;
    vm.foodLimit = limits.foodLimit;
    vm.storage = storage;
    vm.params = {
      weaponQuality: 0,
      berserk: false,
      defenderSide: true
    };

    // definitions
    vm.updateWeapons = updateWeapons;
    vm.updateConsumeObject = updateConsumeObject;
    vm.consume = consume;
    vm.fetchHP = fetchHP;
    vm.updateStorage = updateStorage;
    vm.fetchFightResult = fetchFightResult;
    vm.updateFight = updateFight;
    vm.initModals = initModals;
    vm.initFilters = initFilters;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.initFilters();
    vm.updateWeapons();
    vm.updateConsumeObject();
    vm.initModals();

    ////////////////

    function updateFight(fightId) {
      FightData.fetchFight(fightId)
        .then(function FetchFightSuccess(data) {
          vm.currentFight = data;
        }, function FetchFightError(error) {
          Toast(error);
        });
    }

    function fetchFightResult(quality, berserk) {
      vm.params.berserk = berserk;
      vm.params.weaponQuality = quality.substring(1, 2);
      FightData.fetchFightResult(vm.currentFight.battle.battleId, vm.params)
        .then(function fetchFightSuccess(data) {
          vm.fightData = data;
          vm.fetchHP();
          vm.updateStorage();
          //console.log(data);
        }, function FetchFightError(error) {
          Toast(error);
        });
    }

    function updateStorage() {
      ResourcesData.fetchAllResources()
        .then(function FetchResourcesSuccess(data) {
          vm.storage = data;
          vm.updateWeapons();
          vm.updateConsumeObject();
        }, function FetchResourcesError(error) {
          Toast(error);
        });
    }

    function fetchHP() {
      FightData.fetchCurrentHp()
        .then(function FetchHPSuccess(data) {
          $rootScope.loggedPlayer.health = data;
        }, function FetchHPError(error) {
          Toast(error);
        });
    }

    function consume(item) {
      if (!item) {
        Toast('There is no selected item!');
      } else if (item.substring(0, 1) === 'g') {
        FightData.useGift(item.substring(1, 2))
          .then(function ConsumeGiftSuccess(data) {
            vm.giftLimit = data.giftLimit;
            vm.foodLimit = data.foodLimit;
            vm.fetchHP();
            vm.updateStorage();
          }, function ConsumeGiftFailure(msg) {
            //console.log('nie udalo sie zjesc - g');
            Toast(msg);
          });
      } else {
        FightData.useFood(item.substring(1, 2))
          .then(function ConsumeFoodSuccess(data) {
            console.log(data);
            vm.foodLimit = data.foodLimit;
            vm.giftLimit = data.giftLimit;
            vm.fetchHP();
            vm.updateStorage();
          }, function ConsumeFoodFailure(msg) {
            //console.log('nie udalo sie zjesc - f');
            Toast(msg);
          });
      }
    }

    function updateConsumeObject() {
      var gifts = sieve(vm.storage, {
        resource: 'GIFT'
      });
      gifts = sortArray(gifts, 'quality');
      angular.forEach(gifts, function(val, key) {
        gifts[key].name = "Gift " + gifts[key].name;
        gifts[key].value = "g" + gifts[key].quality;
      });
      var foods = sieve(vm.storage, {
        resource: 'FOOD'
      });
      foods = sortArray(foods, 'quality');
      angular.forEach(foods, function(val, key) {
        foods[key].name = "Food " + foods[key].name;
        foods[key].value = "f" + foods[key].quality;
      });
      vm.foods = foods;
      vm.gifts = gifts;
      vm.consumeObject = foods.concat(gifts);
    }

    function updateWeapons() {
      vm.weapons = sieve(vm.storage, {
        resource: 'WEAPON'
      });
      vm.weapons.push({
        quality: 0,
        name: 'None',
        quantity: '---',
        resource: 'dagger'
      });
      for (var i = 1; i < 6; i++) {
        if (sieve(vm.weapons, {quality: i}).length === 0) {
          vm.weapons.push({
            quality: i,
            name: 'Q' + i,
            quantity: 0,
            resource: 'WEAPON'
          });
        }
      }
      vm.weapons = sortArray(vm.weapons, 'quality');
    }

    function initModals() {
      $ionicModal.fromTemplateUrl(
        'app/fight/fight-modal.tpl.html', {
        scope: $scope
      }).then(function(modal) {
        vm.modal = modal;
      });
      vm.openFightModal = function(defender) {
        vm.params.defenderSide = defender;
        vm.modal.show();
      };
      vm.closeFightModal = function() {
        vm.updateFight(vm.currentFight.battle.battleId);
        vm.modal.hide();
      };
      $scope.$on('$destroy', function() {
        vm.modal.remove();
      });
    }

    function initFilters() {
      sieve = $filter('filter');
      sortArray = $filter('orderBy');
    }
  }

})();

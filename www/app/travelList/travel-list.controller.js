(function () {
  'use strict';

  angular
    .module('travel-list.module')
    .controller('TravelListController', TravelListController);

  TravelListController.$inject = ['$scope', '$ionicScrollDelegate', '$http', 'current', 'countryList'];

  /* @ngInject */
  function TravelListController($scope, $ionicScrollDelegate, $http, current, countryList) {

    // vars
    var vm = this;
    vm.property = 'TravelListController';
    vm.smallCountryList = [];
    vm.current = current;
    vm.countryList = countryList;

    // definitions
    vm.showMore = showMore;

    // inits
    $ionicScrollDelegate.scrollTop();

    ////////////////

    function showMore(val) {
      $ionicScrollDelegate.scrollTo(0, 250, true);
      vm.smallCountryList = val;
    }
  }

})();

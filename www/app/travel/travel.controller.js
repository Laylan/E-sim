(function () {
  'use strict';

  angular
    .module('travel.module')
    .controller('TravelController', TravelController);

  TravelController.$inject = ['$scope', '$filter', '$ionicScrollDelegate', 'Toast', 'storage', 'regions', 'TravelData'];

  /* @ngInject */
  function TravelController($scope, $filter, $ionicScrollDelegate, Toast, storage, regions, TravelData) {

    // vars
    var vm = this;
    vm.property = 'TravelController';
    vm.regions = regions;
    vm.storage = storage;
    var sieve = $filter('filter');
    var sortArray = $filter('orderBy');
    vm.tickets = {};

    // definitions
    vm.updateTickets = updateTickets;
    vm.travel = travel;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.updateTickets();

    ////////////////

    function updateTickets() {
      vm.tickets = sieve(vm.storage, {
        resource: "TICKET"
      });
      vm.tickets = sortArray(vm.tickets, 'quality');
    }

    function travel() {
      TravelData.fetchTravelResult(vm.selectedRgion, vm.selectedTicket)
        .then(function fetchTravelSuccess(data) {
          Toast(data);
        }, function FetchFightError(error) {
          Toast(error);
        });
    }
  }

})();

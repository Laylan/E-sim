(function () {
  'use strict';

  angular
    .module('military-unit.module')
    .controller('MilitaryUnitController', MilitaryUnitController);

  MilitaryUnitController.$inject = ['$scope', '$state', '$ionicScrollDelegate', 'UserData', 'militaryUnitData'];

  /* @ngInject */
  function MilitaryUnitController($scope, $state, $ionicScrollDelegate, UserData, militaryUnitData) {

    // vars
    var vm = this;
    vm.property = 'MilitaryUnitController';
    vm.militaryUnitData = militaryUnitData;

    // definitions
    vm.getLiderProfile = getLiderProfile;
    vm.showProfile = showProfile;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.getLiderProfile();

    ////////////////

    function getLiderProfile() {
      console.log('get lider profile');
      UserData.fetchProfile(militaryUnitData.leaderId)
        .then(function FetchJobOffersSuccess(data) {
          vm.liderProfile = data;
          console.log(data);
        }, function FetchJobOffersError(error) {
          console.log(error);
          Toast(error);
          //   _blockFetchingNextPages = true;
        });
    }

    function showProfile(id) {
      $state.go('main.profile', {
        profileId: id
      });
    }
  }

})();

(function () {
  'use strict';

  angular
    .module('party.module')
    .controller('Controller', Controller);

  Controller.$inject = ['$scope', '$state', '$ionicScrollDelegate', 'UserData', 'partyData'];

  /* @ngInject */
  function Controller($scope, $state, $ionicScrollDelegate, UserData, partyData) {

    // vars
    var vm = this;
    vm.property = 'Controller';
    vm.partyData = partyData;

    // definitions
    vm.getLiderProfile = getLiderProfile;
    vm.showProfile = showProfile;

    // inits
    $ionicScrollDelegate.scrollTop();
    vm.getLiderProfile();

    ////////////////

    function getLiderProfile() {
      console.log('get lider profile');
      UserData.fetchProfile(partyData.leaderId)
        .then(function FetchJobOffersSuccess(data) {
          vm.liderProfile = data;
          console.log(data);
        }, function FetchJobOffersError(error) {
          console.log(error);
          Toast(error);
        });
    }

    function showProfile(id) {
      console.log('show profile of lider');
      $state.go('main.profile', {
        profileId: id
      });
    }
  }

})();

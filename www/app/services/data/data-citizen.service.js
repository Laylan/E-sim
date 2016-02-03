(function () {
  'use strict';

  angular
    .module('data.module')
    .factory('CitizenData', CitizenData);

  CitizenData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log', 'MilitaryRanks'];

  function CitizenData($http, $ionicLoading, $rootScope, $q, $log, MilitaryRanks) {
    return {
      refreshCitizen: RefreshCitizen
    }

    function RefreshCitizen() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/fetchCitizen', {})
        .success(function (loggedCitizen) {
          $rootScope.loggedPlayer = loggedCitizen;
          //console.log('citizen');
          //console.log($rootScope.loggedPlayer);
          $rootScope.loggedPlayer.rank = MilitaryRanks[$rootScope.loggedPlayer.rank];
          //console.log('citizen 2');
          //console.log(MilitaryRanks);
          //console.log($rootScope.loggedPlayer);
        })
        .finally($ionicLoading.hide);
    }
  }
})();

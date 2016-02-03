(function () {
  'use strict';

  angular
    .module('fight-list.module')
    .factory('FightListData', FightListData);

  FightListData.$inject = ['$http', '$q', '$log', '$ionicLoading', '$rootScope'];

  /* @ngInject */
  function FightListData($http, $q, $log, $ionicLoading, $rootScope){

    // return functions
    var exports = {
      fetchLocalFights: fetchLocalFights
    };

    return exports;

    ////////////////

    function fetchLocalFights() {
      var deferred = $q.defer();
        $ionicLoading.show({
          template: 'Loading...'
        });
        $http.get($rootScope.server.address + '/battle/list')
          .success(function Success(results) {
            deferred.resolve(results);
          })
          .error(function Error(msg) {
            $log.error(msg);
            deferred.reject(msg);
          })
          .finally($ionicLoading.hide);
        return deferred.promise;
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('inventory.module')
    .factory('InventoryData', InventoryData);

  InventoryData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  /* @ngInject */
  function InventoryData($http, $ionicLoading, $rootScope, $q, $log) {

    // return functions
    var exports = {
      fetchMoney: fetchMoney
    };

    return exports;

    ////////////////

    function fetchMoney() {
      console.log('fetch money');
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/moneyAccount/')
        .success(function (data) {
          //console.log('money');
          console.log(data);
          deferred.resolve(data);
        })
        .error(function (msg) {
          console.log(msg);
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('specialItem.module')
    .factory('SpecialItemData', SpecialItemData);

  SpecialItemData.$inject = ['$http', '$q', '$log', '$ionicLoading', '$rootScope'];

  /* @ngInject */
  function SpecialItemData($http, $q, $log, $ionicLoading, $rootScope){

    // return functions
    var exports = {
      fetchSpecialItems: fetchSpecialItems,
      useSpecialItem: useSpecialItem


    };

    return exports;

    function fetchSpecialItems() {
      var deferred = $q.defer();
      console.log('fetch Special Items');
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/mySpecialItems/')
        .success(function Success(results) {
          console.log('zwrotka');
          deferred.resolve(results);
          console.log(results);
        })
        .error(function Error(msg) {
          console.log('error');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function useSpecialItem(type) {
      var deferred = $q.defer();
      console.log('use special item');
      console.log(type);
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/useSpecialItem?item=' + type)
          .success(function Success(results) {
              console.log('---------a-------');
          if (results.error) {
            deferred.reject(results.error);
            return;
          }
          deferred.resolve(results);
        })
        .error(function Error(msg) {
          console.log('error');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }



  }
})();

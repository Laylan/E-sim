(function () {
  'use strict';

  angular
    .module('travel-list.module')
    .factory('TravelListData', TravelListData);

  TravelListData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  /* @ngInject */
  function TravelListData($http, $ionicLoading, $rootScope, $q, $log) {

    // return functions
    var exports = {
      currentPosition: currentPosition,
      countryList: countryList
    };

    return exports;

    ////////////////

    function currentPosition() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/travel/current')
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

    function countryList() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/travel/countries')
        .success(function Success(results) {
          var countries = {};
          for (var i in results) {
            var currentLetter = results[i].name.substring(0, 1);
            if (typeof countries[currentLetter] === 'undefined') {
              countries[currentLetter] = [];
            }
            countries[currentLetter].push(results[i]);
          }
          deferred.resolve(countries);
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

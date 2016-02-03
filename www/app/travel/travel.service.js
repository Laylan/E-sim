(function () {
  'use strict';

  angular
    .module('travel.module')
    .factory('TravelData', TravelData);

  TravelData.$inject = ['$http', '$q', '$log', '$ionicLoading', '$rootScope'];

  /* @ngInject */
  function TravelData($http, $q, $log, $ionicLoading, $rootScope) {

    // return functions
    var exports = {
      getRegions: getRegions,
      fetchTravelResult: fetchTravelResult
    };

    return exports;

    ////////////////

    function getRegions(countryId) {
      // package com.eworld.controllers.mobile; - tam so kontrolery; wszysto co macie prekazac jest w argumentach kontrolerow
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/travel/regions?countryId=' + countryId)
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

    function fetchTravelResult(targetRegionId, ticketQuality) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/travel/', {
          targetRegionId: targetRegionId,
          ticketQuality: ticketQuality
        })
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

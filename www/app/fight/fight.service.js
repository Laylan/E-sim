(function () {
  'use strict';

  angular
    .module('fight.module')
    .factory('FightData', FightData);

  FightData.$inject = ['$http', '$q', '$log', '$ionicLoading', '$rootScope'];

  /* @ngInject */
  function FightData($http, $q, $log, $ionicLoading, $rootScope) {

    // return functions
    var exports = {
      fetchFight: fetchFight,
      fetchFightResult: fetchFightResult,
      useGift: useGift,
      useFood: useFood,
      fetchCurrentHp: fetchCurrentHp,
      limits: limits
    };

    return exports;

    ////////////////

    // package com.eworld.controllers.mobile; - tam so kontrolery; wszysto co macie prekazac jest w argumentach kontrolerow
    function fetchFight(fightId) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/battle/' + fightId)
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

    function fetchFightResult(fightId, params) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/battle/' + fightId, params)
        .success(function Success(results) {
          if (results.error) {
            deferred.reject(results.error);
            return;
          }
          deferred.resolve(results);
        })
        .error(function Error(msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function useGift(quality) {
      var deferred = $q.defer();
      //console.log('gift '+quality);
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/heal/gift/' + quality, {})
        .success(function Success(results) {
          if (results.error) {
            deferred.reject(results.error);
            return;
          }
          deferred.resolve(results);
        })
        .error(function Error(msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function useFood(quality) {
      var deferred = $q.defer();
      //	console.log('food '+quality);
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/heal/food/' + quality, {})
        .success(function Success(results) {
          if (results.error) {
            deferred.reject(results.error);
            return;
          }
          deferred.resolve(results);
        })
        .error(function Error(msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function fetchCurrentHp() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/heal/hp/')
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

    function limits() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/heal/limits')
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

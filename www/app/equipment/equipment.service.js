(function() {
  'use strict';

  angular
    .module('equipment.module')
    .factory('EquipmentData', EquipmentData);

  EquipmentData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log', 'Toast'];

  /* @ngInject */
  function EquipmentData($http, $ionicLoading, $rootScope, $q, $log, Toast) {

    // return functions
    var exports = {
      fetchEquipmentOn: fetchEquipmentOn,
      fetchEquipmentOff: fetchEquipmentOff,
      fetchStats: fetchStats,
      putOn: putOn,
      putOff: putOff,
      merge: merge,
      split: split
    };

    return exports;

    ////////////////

    function fetchEquipmentOn() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/equipmentOn/')
        .success(function(data) {
          console.log('equipment On');
          console.log(data);
          var eq = {};
          for(var dd in data){
            //console.log(dd.slot);
            eq[data[dd].slot]=data[dd];
          }
          console.log(eq);
          deferred.resolve(eq);
        })
        .error(function(msg) {
          console.log('error');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function fetchEquipmentOff() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/equipmentOff/')
        .success(function(data) {
          console.log('equipment Off');
          console.log(data);
          deferred.resolve(data);
        })
        .error(function(msg) {
          console.log('error');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function fetchStats() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/battleStats/')
        .success(function(data) {
          console.log('battle statistics');
          console.log(data);
          deferred.resolve(data);
        })
        .error(function(msg) {
          console.log('error');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function putOn(id) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/equipmentAction/putOn?equipmentId='+id)
        .success(function(data) {
          console.log('equ Put on');
          console.log(data);
          deferred.resolve(data);
        })
        .error(function(msg) {
          console.log('error');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function putOff(id) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/equipmentAction/putOff?equipmentId='+id)
        .success(function(data) {
          console.log('equ put Off');
          console.log(data);
          deferred.resolve(data);
        })
        .error(function(msg) {
          console.log('error');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function split(id) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/equipmentAction/split?equipmentId='+id)
        .success(function(data) {
          console.log('equ split');
          console.log(data);
          deferred.resolve(data);
        })
        .error(function(msg) {
          console.log('error');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function merge(id1, id2, id3) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/equipmentAction/merge', {
        equipmentId1: id1,
        equipmentId2: id2,
        equipmentId3: id3
      })
        .success(function(data) {
          console.log('equ merge');
          console.log(data);
          Toast(data);
          deferred.resolve(data);
        })
        .error(function(msg) {
          console.log('error');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }
  }
})();

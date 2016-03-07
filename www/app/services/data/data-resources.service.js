(function () {
  'use strict';

  angular
    .module('data.module')
    .factory('ResourcesData', ResourcesData);

  ResourcesData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  function ResourcesData($http, $ionicLoading, $rootScope, $q, $log) {
    return {
      fetchResourceItem: FetchResourceItem,
      fetchAllResources: FetchAllResources,
      fetchMyEquipmentOff: fetchMyEquipmentOff
    }

    function FetchResourceItem(resourceName) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/resource/' + resourceName.toUpperCase().replace(' ', '_'))
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function FetchAllResources() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/resource')
        .success(function (data) {
          angular.forEach(data, function(val, key ){
            data[key].myName = val.resource +' Q'+val.quality+' /'+ val.quantity+'/';
          });
          deferred.resolve(data);
        })
        .error(function (msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function fetchMyEquipmentOff() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/equipmentOff/')
        .success(function(data) {
          angular.forEach(data, function(val, key ){
            data[key].myName = val.slot.replace('_', ' ')+ ' ' + val.quality;
          });
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
  }
})();

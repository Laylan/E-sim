(function () {
  'use strict';

  angular
    .module('contracts-templates.module')
    .factory('ContractsTemplatesData', ContractsTemplatesData);

  ContractsTemplatesData.$inject = ['$http', '$q', '$log', '$ionicLoading', '$rootScope', 'Toast'];

  /* @ngInject */
  function ContractsTemplatesData($http, $q, $log, $ionicLoading, $rootScope, Toast) {

    // ereturn functions
    var exports = {
      fetchTemplates: fetchTemplates,
      fetchTemplate: fetchTemplate,
      fetchFriends: fetchFriends,
      deleteTemplate: deleteTemplate,
      propose: propose,
    };

    return exports;

    ////////////////

    function fetchTemplates() {
      console.log('fetch Templates');
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/contracts/templates')
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

    function fetchTemplate(id) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/contract/get/'+id)
        .success(function Success(results) {
          console.log('konkretny kontrakt');
          console.log(results);
          deferred.resolve(results);
        })
        .error(function Error(msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function fetchFriends(prefix) {
      console.log('fetch Freinds by prefix: ' + prefix);
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/friendsByName/'+prefix)
        .success(function Success(results) {
          console.log('friends');
          console.log(results);
          deferred.resolve(results);
        })
        .error(function Error(msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function propose(contractId, login) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/contract/propose/',{
        contractId: contractId,
        login: login
      })
        .success(function (data) {
          if (data) {
            deferred.resolve(data);
            Toast(data);
            return;
          }
          deferred.resolve("OK");
          Toast("Deal!");
        })
        .error(function (msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function deleteTemplate(id) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/contract/deleteTemplate/'+id)
        .success(function (data) {
          if (data) {
            deferred.resolve(data);
            Toast(data);
            console.log('succes');
            return;
          }
          deferred.resolve("OK");
        })
        .error(function (msg) {
          console.log('error');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }
  }

})();

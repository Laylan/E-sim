(function() {
  'use strict';

  angular
    .module('local-shouts.module')
    .factory('LocalShoutsData', LocalShoutsData);

  LocalShoutsData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log', 'Toast'];

  /* @ngInject */
  function LocalShoutsData($http, $ionicLoading, $rootScope, $q, $log, Toast) {

    // return functions
    var exports = {
      fetchLocalShouts: fetchLocalShouts,
      sendShout: sendShout,
      voteShout: voteShout
    };

    return exports;

    ////////////////

    function fetchLocalShouts(page) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/localShouts?page=' + page + '&countryId=' + $rootScope.loggedPlayer.citizenshipId)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(msg) {
          console.log(msg);
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function sendShout(parentShoutId, message, sendToFriends, sendToCountry, sendToMilitaryUnit, sendToParty, stockCompanyId) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/writeShout', {
          parentShoutId: parentShoutId,
          message: message,
          sendToFriends: sendToFriends,
          sendToCountry: sendToCountry,
          sendToMilitaryUnit: sendToMilitaryUnit,
          sendToParty: sendToParty,
          stockCompanyId: stockCompanyId
        })
        .success(function(data) {
          deferred.resolve("OK");
          Toast("sent!");
        })
        .error(function(msg) {
          console.log(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function voteShout(id) {
      var deferred = $q.defer();
      //  alert('vote shout')
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/voteShout/' + id)
        .success(function(data) {
          if (data) {
            Toast(data);
            deferred.resolve(data);
          }

          deferred.resolve("OK");
        })
        .error(function(msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }
  }

})();

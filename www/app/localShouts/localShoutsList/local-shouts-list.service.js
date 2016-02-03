(function () {
  'use strict';

  angular
    .module('local-shouts-list.module')
    .factory('LocalShoutsListData', LocalShoutsListData);

  LocalShoutsListData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  /* @ngInject */
  function LocalShoutsListData($http, $ionicLoading, $rootScope, $q, $log) {

    // return functions
    var exports = {
      fetchShout: fetchShout,
      fetchComments: fetchComments,
      fetchVotes: fetchVotes
    };

    return exports;

    ////////////////

    function fetchShout(id) {
      var deferred = $q.defer();
      console.log('fetch shout');
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/shout/' + id)
        .success(function (data) {
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

    function fetchComments(id, page) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/localShouts/comments?page=' + page + '&shoutId=' + id)
        .success(function (data) {
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

    function fetchVotes(id) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/localShouts/votes?shoutId=' + id)
        .success(function (data) {
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

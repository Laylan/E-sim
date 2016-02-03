(function() {
  'use strict';

  angular
    .module('friends.module')
    .factory('FriendsData', FriendsData);

  FriendsData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  /* @ngInject */
  function FriendsData($http, $ionicLoading, $rootScope, $q, $log) {

    // return functions
    var exports = {
      fetchFriends: fetchFriends
    };

    return exports;

    ////////////////

    function fetchFriends(id, page) {
      console.log('fetch Friends');
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/friends/' + id + '?page=' + page)
        .success(function(data) {
          console.log(data);
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
  }
})();

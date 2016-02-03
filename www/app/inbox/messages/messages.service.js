(function () {
  'use strict';

  angular
    .module('messages.module')
    .factory('MessagesData', MessagesData);

  MessagesData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  /* @ngInject */
  function MessagesData($http, $ionicLoading, $rootScope, $q, $log) {

    // return functions
    var exports = {
      fetchMessages: fetchMessages,
      fetchMessageCount: fetchMessageCount,
      fetchConversation: fetchConversation
    };

    return exports;

    ////////////////

    function fetchMessages(page) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/inbox/messages?page=' + page)
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

    function fetchMessageCount() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/inbox/messages/count')
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

    function fetchConversation(id, page) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/inbox/messages/conversation/' + id + '?page=' + page)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(msg) {
        console.log('wszedzie errory');
        $log.error(msg);
        deferred.reject(msg);
      })
      .finally($ionicLoading.hide);
      return deferred.promise;
    }
}
})();

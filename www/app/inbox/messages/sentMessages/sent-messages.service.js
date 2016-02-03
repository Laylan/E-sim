(function () {
  'use strict';

  angular
    .module('sent-messages.module')
    .factory('SentMessagesData', SentMessagesData);

  SentMessagesData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  /* @ngInject */
  function SentMessagesData($http, $ionicLoading, $rootScope, $q, $log) {

    // return functions
    var exports = {
      fetchSentMessages: fetchSentMessages,
    };

    return exports;

    ////////////////

    function fetchSentMessages(page) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/inbox/messages/sent?page=' + page)
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

  }
})();

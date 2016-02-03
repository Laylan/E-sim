(function () {
  'use strict';

  angular
    .module('write-message.module')
    .factory('WriteMessageData', WriteMessageData);

  WriteMessageData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log', 'Toast'];

  /* @ngInject */
  function WriteMessageData($http, $ionicLoading, $rootScope, $q, $log, Toast) {

    // return functions
    var exports = {
      writeMessage: writeMessage,
    };

    return exports;

    ////////////////

    function writeMessage(title, message, receiverName) {
      var deferred = $q.defer();
      console.log(title);
      console.log(message);
      console.log(receiverName);
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/inbox/messages/write', {title: title, message: message, receiverName: receiverName})
        .success(function (data) {
          deferred.resolve("OK");
          Toast("sent!");
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

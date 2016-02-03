(function () {
  'use strict';

  angular
    .module('notifications.module')
    .factory('NotificationsData', NotificationsData);

  NotificationsData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  /* @ngInject */
  function NotificationsData($http, $ionicLoading, $rootScope, $q, $log) {

    // return functions
    var exports = {
      fetchNotifications: fetchNotifications,
      fetchNotificationCount: fetchNotificationCount
    };

    return exports;

    ////////////////

    function fetchNotifications(page) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/inbox/notifications?page=' + page)
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

    function fetchNotificationCount() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/inbox/notifications/count')
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

(function () {
    'use strict';

    angular
      .module("globals.module")
      .factory("NotificationTypes", NotificationTypes);

    NotificationTypes.$inject = ['$q', '$http'];

    function NotificationTypes($q, $http) {
      var deferred = $q.defer();
      $http.get("./assets/jsons/notificationTypes.json")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

})();

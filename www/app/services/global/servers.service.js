(function () {
    'use strict';

    angular
      .module("globals.module")
      .factory("Servers", Servers);

    Servers.$inject = ['$q', '$http'];

    function Servers($q, $http) {
      var deferred = $q.defer();
      $http.get("./assets/jsons/servers.json")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

})();

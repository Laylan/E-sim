(function () {
    'use strict';

    angular
      .module("globals.module")
      .factory("Resources", Resources);

    Resources.$inject = ['$q', '$http'];

    function Resources($q, $http) {
      var deferred = $q.defer();
      $http.get("./assets/jsons/resources.json")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

})();

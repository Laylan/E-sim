(function () {
    'use strict';

    angular
      .module("globals.module")
      .factory("MilitaryRanks", MilitaryRanks);

    MilitaryRanks.$inject = ['$q', '$http'];

    function MilitaryRanks($q, $http) {
      var deferred = $q.defer();
      $http.get("./assets/jsons/militaryRanks.json")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

})();

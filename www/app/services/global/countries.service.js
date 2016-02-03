(function () {
  'use strict';

  angular
    .module('globals.module')
    .factory('Countries', Countries);

  Countries.$inject = ['$q', '$http'];

  /* @ngInject */
  function Countries($q, $http){

    // return functions
    var exports = {
      fetch: fetch
    };

    return exports;

    ////////////////

    function fetch() {
      var deferred = $q.defer();
      $http.get("./assets/jsons/countries.json")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
  }
})();

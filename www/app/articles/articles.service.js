(function() {
  'use strict';

  angular
    .module('articles.module')
    .factory('ArticlesData', ArticlesData);

  ArticlesData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log', 'Toast'];

  function ArticlesData($http, $ionicLoading, $rootScope, $q, $log, Toast) {
    // return functions
    var exports = {
      fetchArticles: fetchArticles
    };

    return exports;



    function fetchArticles(page, country) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/localArticles?country='+country+'&page='+page)
        .success(function(data) {
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

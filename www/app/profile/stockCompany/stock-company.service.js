(function () {
  'use strict';

  angular
    .module('stock-company.module')
    .factory('StockCompanyData', StockCompanyData);

  StockCompanyData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log', 'Toast'];

  /* @ngInject */
  function StockCompanyData($http, $ionicLoading, $rootScope, $q, $log, Toast) {

    // return functions
    var exports = {
      fetchCompany: fetchCompany
    };

    return exports;

    ////////////////

    function fetchCompany(id) {
      console.log('fetch Company');
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/sc/' + id)
        .success(function (data) {
          console.log('tip top');
          console.log(data);
          deferred.resolve(data);
        })
        .error(function (msg) {
          console.log('error');
          console.log(msg);
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }
  }

})();

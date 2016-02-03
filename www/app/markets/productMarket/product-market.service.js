(function () {
  'use strict';

  angular
    .module('product-market.module')
    .factory('ProductMarketData', ProductMarketData);

  ProductMarketData.$inject = ['$http', '$q', '$log', '$ionicLoading', '$rootScope', 'Toast'];

  /* @ngInject */
  function ProductMarketData($http, $q, $log, $ionicLoading, $rootScope, Toast) {

    // ereturn functions
    var exports = {
      fetchProducts: fetchProducts,
      deal: deal
    };

    return exports;

    ////////////////

    function fetchProducts(page, country, quality, resource) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/productMarket/?page=' + page + '&resource=' + resource + '&countryId=' + country + '&quality=' + quality)
        .success(function Success(results) {
          deferred.resolve(results);
        })
        .error(function Error(msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function deal(amount, offerId) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/productMarket/deal', {
          offerId: offerId,
          amount: amount
        })
        .success(function (data) {
          if (data) {
            deferred.resolve(data);
            Toast(data);
            return;
          }
          deferred.resolve("OK");
          Toast("bought!");
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

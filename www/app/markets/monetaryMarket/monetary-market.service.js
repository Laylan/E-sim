(function () {
  'use strict';

  angular
    .module('monetary-market.module')
    .factory('MonetaryMarketData', MonetaryMarketData);

  MonetaryMarketData.$inject = ['$http', '$q', '$log', '$ionicLoading', '$rootScope', 'Toast'];

  /* @ngInject */
  function MonetaryMarketData($http, $q, $log, $ionicLoading, $rootScope, Toast) {

    // return functions
    var exports = {
      fetchOffers: fetchOffers,
      deal: deal
    };

    return exports;

    ////////////////

    function fetchOffers(page, buyerCurrencyId, sellerCurrencyId) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/monetaryMarket/?page=' + page + '&buyerCurrencyId=' + sellerCurrencyId + '&sellerCurrencyId=' + buyerCurrencyId)
        //serwer zwraca dane w druga strone
        .success(function Success(results) {
          deferred.resolve(results);
        })
        .error(function Error(msg) {
          console.log('cos nie tak' + msg);
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
      $http.post($rootScope.server.address + '/monetaryMarket/deal', {
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

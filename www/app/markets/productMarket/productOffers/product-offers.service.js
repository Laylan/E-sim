(function () {
  'use strict';

  angular
    .module('product-offers.module')
    .factory('ProductOffersData', ProductOffersData);

  ProductOffersData.$inject = ['$http', '$q', '$log', '$ionicLoading', '$rootScope', 'Toast'];

  /* @ngInject */
  function ProductOffersData($http, $q, $log, $ionicLoading, $rootScope, Toast) {

    // return functions
    var exports = {
      fetchMyProductOffers: fetchMyProductOffers,
      createNewProductOffer: createNewProductOffer,
      removeProductOffer: removeProductOffer
    };

    return exports;

    ////////////////

    function fetchMyProductOffers(page) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/productMarket/myOffers?page=' + page )
        //serwer zwraca dane w druga strone
        .success(function Success(results) {
          console.log(results);
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

    function createNewProductOffer(resource,quality, amount, countryId, price) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/productMarket/postOffer', {
          resource: resource,
          quality: quality,
          amount: amount,
          countryId: countryId,
          price: price
        })
        .success(function (data) {
          if (data) {
            deferred.resolve(data);
            Toast(data);
            return;
          }
          deferred.resolve("OK");
        })
        .error(function (msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function removeProductOffer(id) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/productMarket/removeOffer?offerId='+id)
        .success(function (data) {
          if (data) {
            deferred.resolve(data);
            Toast(data);
            console.log('succes');
            return;
          }
          deferred.resolve("OK");
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

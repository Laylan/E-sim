(function () {
  'use strict';

  angular
    .module('monetary-offers.module')
    .factory('MonetaryOffersData', MonetaryOffersData);

  MonetaryOffersData.$inject = ['$http', '$q', '$log', '$ionicLoading', '$rootScope', 'Toast'];

  /* @ngInject */
  function MonetaryOffersData($http, $q, $log, $ionicLoading, $rootScope, Toast) {

    // return functions
    var exports = {
      fetchMyOffers: fetchMyOffers,
      createOwn: createOwn,
      removeOffer: removeOffer
    };

    return exports;

    ////////////////

    function fetchMyOffers(page) {
      var deferred = $q.defer();
      console.log('fetch my offers');
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/monetaryMarket/myOffers?page=' + page )
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

    function createOwn(amount, offeredMoneyId, buyedMoneyId, exchangeRatio) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/monetaryMarket/postOffer/', {
          offeredMoneyId: offeredMoneyId,
          buyedMoneyId: buyedMoneyId,
          amount: amount,
          exchangeRatio: exchangeRatio
        })
        .success(function (data) {
          if (data) {
            deferred.resolve(data);
            Toast(data);
            return;
          }
          deferred.resolve("OK");
          Toast("Posted");
        })
        .error(function (msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function removeOffer(id) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/monetaryMarket/removeOffer?offerId='+id)
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
  }

})();

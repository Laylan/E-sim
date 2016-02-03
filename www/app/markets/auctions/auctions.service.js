(function () {
  'use strict';

  angular
    .module('auctions.module')
    .factory('AuctionsData', AuctionsData);

  AuctionsData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  /* @ngInject */
  function AuctionsData($http, $ionicLoading, $rootScope, $q, $log) {

    // return functions
    var exports = {
      fetchAuctions: fetchAuctions,
      fetchAuction: fetchAuction,
      bid: bid,
      createAuction: createAuction
    };

    return exports;

    ////////////////

    function fetchAuctions(page, status, sorting, type) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/auctions/?page=' + page + '&status=' + status + '&sorting=' + sorting + '&type=' + type)
        .success(function Success(results) {
          deferred.resolve(results);
        })
        .error(function Error(msg, code) {
          $log.error(msg, code);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function fetchAuction(id) {
//znalezienie konkretnej aukcji do bidowania
    }

    function bid(auctionId, bid) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      console.log('parametry');
      console.log(auctionId);
      console.log(bid);
      $http.post($rootScope.server.address + '/bidAuction', {
          auctionId: auctionId,
          bid: bid
        })
        .success(function (data) {
          if (data) {
            console.log('zabidowane');
            deferred.resolve(data);
            Toast(data);
            return;
          }
          deferred.resolve("OK");
          //Toast("bought!");
        })
        .error(function (msg) {
          console.log('errorek');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function createAuction() {

    }
  }
})();

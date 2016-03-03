(function () {
  'use strict';

  angular
    .module('auctions-offers.module')
    .factory('AuctionsOffersData', AuctionsOffersData);

  AuctionsOffersData.$inject = ['$http', '$q', '$log', '$ionicLoading', '$rootScope', 'Toast'];

  /* @ngInject */
  function AuctionsOffersData($http, $q, $log, $ionicLoading, $rootScope, Toast) {

    // return functions
    var exports = {
      fetchMyAuctions: fetchMyAuctions,
      createNewAuctionOffer: createNewAuctionOffer,
      removeAuctionOffer: removeAuctionOffer
    };

    return exports;

    ////////////////

    function fetchMyAuctions(page, status) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      console.log('fetchMyAuctions');
      console.log('page '+page+' status '+status);
      $http.get($rootScope.server.address + '/ownedAuctions?page=' + page + '&status=' + status)
        //serwer zwraca dane w druga strone
        .success(function Success(results) {
          deferred.resolve(results);
        })
        .error(function Error(msg) {
          //console.log('smothing wrong' + msg);
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function createNewAuctionOffer(price, lengthInHours, additionalMinutes, equipmentId, companyId, specialItemType) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      console.log('Price: ' + price + ', lengthInHours:'+ lengthInHours + ', additionalMinutes:' + additionalMinutes + ', equipmentId:'+ equipmentId +', companyId:' + companyId + ', specialItemType:' + specialItemType);
      $http.post($rootScope.server.address + '/createAuction', {
          price: price,
          lengthInHours: lengthInHours,
          additionalMinutes: additionalMinutes,
          equipmentId: equipmentId,
          companyId: companyId,
          specialItemType: specialItemType
        })
        .success(function (data) {
          if (data) {
            deferred.resolve(data);
            Toast(data);
            return;
          }
          deferred.resolve("created!");
        })
        .error(function (msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function removeAuctionOffer(auctionId) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      console.log('usuwanie oferty');
      $http.post($rootScope.server.address + '/cancelAuction?auctionId=' + auctionId)
      // $http.get($rootScope.server.address + '/productMarket/removeOffer?offerId='+id)
        .success(function (data) {
          if (data) {
            deferred.resolve(data);
            Toast(data);
            console.log('succes');
            return;
          }
          deferred.resolve("auction removed");
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

(function () {
  'use strict';

  angular
    .module('auctions.module')
    .factory('AuctionsData', AuctionsData);

  AuctionsData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log', 'Toast'];

  /* @ngInject */
  function AuctionsData($http, $ionicLoading, $rootScope, $q, $log, Toast) {

    // return functions
    var exports = {
      fetchAuctions: fetchAuctions,
      fetchAuction: fetchAuction,
      bid: bid,
      remove: remove,
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
          if(results.length===0){
            Toast("No results");
          }
          else{
            if(type==="SPECIAL_ITEM" || type==="COMPANY"){
              alert("This function is not implemented yet. This project is OPEN SOURCE, you can join it and implement this function!\nLink to project in 'about' section.");
            }
            else{
              deferred.resolve(results);
            }
          }
        })
        .error(function Error(msg, code) {
          $log.error(msg, code);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function fetchAuction(auctionId) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/auction/' + auctionId)
        .success(function Success(results) {
          console.log(results);
          deferred.resolve(results);
        })
        .error(function Error(msg, code) {
          $log.error(msg, code);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function bid(auctionId, bid) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      // console.log('parameters');
      // console.log(auctionId);
      // console.log(bid);
      $http.post($rootScope.server.address + '/bidAuction', {
          auctionId: auctionId,
          bid: bid
        })
        .success(function (data) {
          if (data) {
            console.log(data);
            deferred.resolve(data);

            return;
          }
          deferred.resolve("OK");
          Toast("OK");
        })
        .error(function (msg) {
          //console.log('little error');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }
    function remove(auctionId) {
      alert("This function is not implemented yet. This project is OPEN SOURCE, you can join it and implement this function!\nLink to project in 'about' section.");
      // var deferred = $q.defer();
      // $ionicLoading.show({
      //   template: 'Loading...'
      // });
      // console.log('parametry');
      // console.log(auctionId);
      // $http.post($rootScope.server.address + '/cancelAuction/' + auctionId)
      //   .success(function (data) {
      //     if (data) {
      //       console.log('Removed!');
      //       console.log(data);
      //       deferred.resolve(data);
      //
      //       return;
      //     }
      //     deferred.resolve("OK");
      //     Toast("OK");
      //   })
      //   .error(function (msg) {
      //     console.log('errorek');
      //     $log.error(msg);
      //     deferred.reject(msg);
      //   })
      //   .finally($ionicLoading.hide);
      // return deferred.promise;
    }
  }
})();

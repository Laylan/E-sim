(function () {
  'use strict';

  angular
    .module('job-market.module')
    .factory('JobMarketData', JobMarketData);

  JobMarketData.$inject = ['$rootScope', '$q', '$http', '$log', '$ionicLoading', 'Resources'];

  /* @ngInject */
  function JobMarketData($rootScope, $q, $http, $log, $ionicLoading, Resources) {

    // return functions
    var exports = {
      fetchJobOffers: fetchJobOffers,
      fetchJobOfferCount: fetchJobOfferCount,
      applyForJob: applyForJob
    };

    return exports;

    ////////////////

    function fetchJobOffers(page, countryId, minimalEcoSkill) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      var queryString = '?page=' + page + '&countryId=' + countryId + '&minimalEconomicSkill=' + minimalEcoSkill;
      $q.all({
          offers: $http.get($rootScope.server.address + '/jobMarket' + queryString),
          resources: Resources
        })
        .then(function (result) {
          angular.forEach(result.offers.data, function enhance(offer) {
            //console.log(offer);
            offer.company.resourceObj = result.resources[offer.company.resource];
          });
          deferred.resolve(result.offers.data);
        }, function (msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .then($ionicLoading.hide);

      return deferred.promise;
    }

    function fetchJobOfferCount(countryId, minimalEcoSkill) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      var queryString = '?countryId=' + countryId + '&minimalEconomicSkill=' + minimalEcoSkill;
      $http.get($rootScope.server.address + '/jobMarket/count' + queryString)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function applyForJob(offerId) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/jobMarket/apply', {
          offerId: offerId
        })
        .success(function (data) {
          if (data) {
            deferred.resolve(data);
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

(function () {
  'use strict';

  angular
    .module('data.module')
    .factory('CountryData', CountryData);

  CountryData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  function CountryData($http, $ionicLoading, $rootScope, $q, $log) {
    return {
      countryList: countryList,
      currienciesList: currienciesList,
      fetchMoney: fetchMoney
    }

    function countryList() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/travel/countries')
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

    function currienciesList() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/travel/countries')
        .success(function Success(results) {
          var gold = {
            "countryId": 0,
            "currencyName": "Gold",
            "name": "Gold",
            "shortName": "Gold",
            "nameAndCurrency": "Gold(Gold)"
          };
          var curriencies = {
            0: gold
          };
          for (var w in results) {
            curriencies[results[w].countryId] = results[w];
            curriencies[results[w].countryId].nameAndCurrency = results[w].currencyName + "(" + results[w].name + ")";
          }
          deferred.resolve(curriencies);
        })
        .error(function Error(msg) {
          console.log('error');
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function fetchMoney() {
      console.log('fetch money');
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/moneyAccount/')
        .success(function (data) {
          //console.log('money');
          console.log(data);
          var money = {};
          for (var i in data) {
            money[data[i].currencyId] = data[i];
          }
          deferred.resolve(money);
        })
        .error(function (msg) {
          console.log(msg);
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }
  }
})();

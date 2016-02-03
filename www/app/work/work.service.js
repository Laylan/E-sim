(function () {
  'use strict';

  angular
    .module('work.module')
    .factory('WorkData', WorkData);

  WorkData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log', 'Countries', 'FindOne'];

  /* @ngInject */
  function WorkData($http, $ionicLoading, $rootScope, $q, $log, Countries, FindOne) {

    // return functions
    var exports = {
      fetchWorkData: fetchWorkData,
      performWork: performWork,
      leaveJob: leaveJob
    };

    return exports;

    ////////////////

    function fetchWorkData() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $q.all({
          workData: $http.get($rootScope.server.address + '/work'),
          countries: Countries.fetch()
        })
        .then(function Success(results) {
          if (results.workData.data.error) {
            deferred.reject(results.workData.data.error);
            return;
          }
          var currencyCountry = FindOne(results.countries, function (elem) {
            return elem.id === results.workData.data.currencyId; // Okazuje sie, ze workData to jeszcze nie jest nasz obiekt z danymi tylko cos co jeszcze zawiera wszystkie naglowki, kody, itp.
          });
          delete results.workData.data.currencyId;
          results.workData.data.currencyCountry = currencyCountry;
          deferred.resolve(results.workData.data);
        }, function Error(msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .then($ionicLoading.hide);
      return deferred.promise;
    }

    function performWork() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/work', {}) //Przy kazdym zapytaniu typu post ZAWSZE trzeba dac jakies cialo, chocby puste
        .success(function (data) {
          if (data.error) {
            deferred.reject(data.error);
            return;
          }
          deferred.resolve(data);
        })
        .error(function (msg) {
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function leaveJob() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/work/leave', {})
        .success(function (data) {
          if (data) {
            deferred.reject(data);
            return;
          }
          deferred.resolve('OK');
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

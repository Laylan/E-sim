(function () {
  'use strict';

  angular
    .module('train.module')
    .factory('TrainData', TrainData);

  TrainData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  /* @ngInject */
  function TrainData($http, $ionicLoading, $rootScope, $q, $log) {

    // return functions
    var exports = {
      fetchTrainData: fetchTrainData,
      performTraining: performTraining
    };

    return exports;

    ////////////////

    function fetchTrainData() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/train')
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

    function performTraining() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post($rootScope.server.address + '/train', {})
        .success(function (data) {
          if (data.error) {
            deferred.reject(data.error);
            return;
          }
          deferred.resolve(data);
        })
        .error(function (msg) {
          $log.error(msg);
          deferred.reject('UNKNOWN ERROR');
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }
  }

})();

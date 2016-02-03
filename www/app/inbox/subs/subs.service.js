(function () {
  'use strict';

  angular
    .module('subs.module')
    .factory('SubsData', SubsData);

  SubsData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  /* @ngInject */
  function SubsData($http, $ionicLoading, $rootScope, $q, $log){

    // return functions
    var exports = {
      fetchSubs: fetchSubs,
      fetchSubsCount: fetchSubsCount
    };

    return exports;

    ////////////////

    function fetchSubs(page) {
                var deferred = $q.defer();
                $ionicLoading.show({template: 'Loading...'});
                $http.get($rootScope.server.address + '/inbox/subs?page=' + page)
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

    function fetchSubsCount() {
                var deferred = $q.defer();
                $ionicLoading.show({template: 'Loading...'});
                $http.get($rootScope.server.address + '/inbox/subs/count')
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
  }
})();

(function () {
  'use strict';

  angular
    .module('party.module')
    .factory('PartyData', PartyData);

  PartyData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log', 'Toast'];

  /* @ngInject */
  function PartyData($http, $ionicLoading, $rootScope, $q, $log, Toast){

    // return functions
    var exports = {
      fetchParty: fetchParty
    };

    return exports;

    ////////////////

    function fetchParty(id) {
      console.log('fetch party');
			var deferred = $q.defer();
			$ionicLoading.show({template: 'Loading...'});
			$http.get($rootScope.server.address + '/party/'+id)
			.success(function (data) {
				console.log(data);
				deferred.resolve(data);
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

(function () {
  'use strict';

  angular
    .module('military-unit.module')
    .factory('MilitaryUnitData', MilitaryUnitData);

  MilitaryUnitData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log', 'Toast'];

  /* @ngInject */
  function MilitaryUnitData($http, $ionicLoading, $rootScope, $q, $log, Toast){

    // return functions
    var exports = {
      fetchMilitaryUnit: fetchMilitaryUnit
    };

    return exports;

    ////////////////

    function fetchMilitaryUnit(id) {
      console.log('fetch Military unit');
			var deferred = $q.defer();
			$ionicLoading.show({template: 'Loading...'});
			$http.get($rootScope.server.address + '/mu/'+id)
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

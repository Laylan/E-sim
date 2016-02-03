(function() {
  'use strict';

  angular
    .module('achievements.module')
    .factory('AchievementsData', AchievementsData);

  AchievementsData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log'];

  /* @ngInject */
  function AchievementsData($http, $ionicLoading, $rootScope, $q, $log) {

    // return functions
    var exports = {
      fetchAchievements: fetchAchievements,
      fetchAchievementsTypes: fetchAchievementsTypes
    };

    return exports;

    ////////////////

    function fetchAchievements(id) {
      var deferred = $q.defer();
         $ionicLoading.show({template: 'Loading...'});
         $http.get($rootScope.server.address + '/achievementsByCategory/'+id)
             .success(function (data) {
               console.log('achievements');
               console.log(data);
               var achiv = {};
               for(var aa in data) {
                 achiv[data[aa].category]=data[aa];
               }
               //console.log(achiv);
                 deferred.resolve(data);
             })
             .error(function (msg) {
               console.log('error');
               $log.error(msg);
               deferred.reject(msg);
             })
             .finally($ionicLoading.hide);
         return deferred.promise;
    }

    function fetchAchievementsTypes() {
         var deferred = $q.defer();
         $ionicLoading.show({template: 'Loading...'});
         $http.get($rootScope.server.address + '/achievementsCategories/')
             .success(function (data) {
               console.log('achievements types');
               console.log(data);
                 deferred.resolve(data);
             })
             .error(function (msg) {
               console.log('error');
               $log.error(msg);
               deferred.reject(msg);
             })
             .finally($ionicLoading.hide);
         return deferred.promise;
     }
  }
})();

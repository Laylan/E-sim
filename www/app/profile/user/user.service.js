(function () {
  'use strict';

  angular
    .module('user.module')
    .factory('UserData', UserData);

  UserData.$inject = ['$http', '$ionicLoading', '$rootScope', '$q', '$log', 'Toast'];

  /* @ngInject */
  function UserData($http, $ionicLoading, $rootScope, $q, $log, Toast) {

    // return functions
    var exports = {
      fetchProfile: fetchProfile,
      fetchFriends: fetchFriends,
      fetchCitizenByLogin:fetchCitizenByLogin
    };

    return exports;

    ////////////////

    function fetchProfile(id) {
      console.log('fetchProfile');
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/profile/' + id)
        .success(function (data) {
          console.log('data');
          console.log('Profile',data);
          deferred.resolve(data);
        })
        .error(function (msg) {
          console.log('error',msg);
          $log.error(msg);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }
    function fetchCitizenByLogin(citizenLogin) {
     var deferred = $q.defer();
     console.log('fetch citizen');
     console.log(citizenLogin);
     $ionicLoading.show({
       template: 'Loading...'
     });
     $http.get($rootScope.server.address + '/profileByLogin/'+citizenLogin)
       .success(function (data) {
         console.log('succes');
       console.log(data);
         deferred.resolve(data);
       })
       .error(function (msg) {
         console.log('error');
         console.log(msg);
         $log.error(msg);
         deferred.reject(msg);
       })
       .finally($ionicLoading.hide);
     return deferred.promise;
   }

    function fetchFriends(id, page) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get($rootScope.server.address + '/friends/' + id + '?page=' + page)
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

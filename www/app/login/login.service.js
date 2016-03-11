(function() {
  'use strict';

  angular
    .module('login.module')
    .factory('Login', Login);

  Login.$inject = ['$http', '$ionicLoading', '$rootScope', '$state', '$q', '$log'];

  /* @ngInject */
  function Login($http, $ionicLoading, $rootScope, $state, $q, $log) {

    // return functions
    var exports = {
      login: login,
      autoLogin: autoLogin,
      getServerList: getServerList
    };

    return exports;

    ////////////////

    function login(loginParameters, server) {
      // $http.defaults.headers["Accept"] = "application/json, text/plain, */*" ;
      // $http.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.post(server.address + '/login', loginParameters)
        .success(function SuccessCallback(result, status, headers, config) {
          if (result.error) {
            deferred.reject(result.error);
          } else {
            result.server = server; // dodajemy dane o serwerze do gracza
            deferred.resolve(result);
          }
        })
        .error(function ErrorCallback(msg, status, headers, config) {
          //TODO Wywalic (?)
          $log.error(msg);
          $log.error(status);
          $log.error(headers);
          deferred.reject(msg);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }

    function autoLogin() {
      var deferred = $q.defer();
      var rememberedData = JSON.parse(window.localStorage.rememberedLogin || "null");
      if (!rememberedData) {
        deferred.reject("No remembered data");
      } else {
        $ionicLoading.show({
          template: 'Loading...'
        });
        $http.post(rememberedData.server.address + '/autologin', rememberedData.token)
          .success(function SuccessCallback(result) {
            if (result.error) {
              deferred.reject(result.error);
            } else {
              result.server = rememberedData.server; // dodajemy dane o serwerze do gracza
              deferred.resolve(result);
            }
          })
          .error(function ErrorCallback(msg) {
            $log.error(msg);
            deferred.reject(msg);
          })
          .finally($ionicLoading.hide);
      }
      return deferred.promise;
    }

    function getServerList() {
      console.log('getServerList');
      // $http.defaults.headers["Accept"] = "application/json, text/plain, */*" ;
      // $http.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });
      $http.get('http://e-sim.org/servers.json')
        .success(function Success(result, status, headers, config) {
          if (result.error) {
            console.log('error w succes');
            deferred.reject(result.error);
          } else {
            //  Toast(result);
            console.log(result);
            deferred.resolve(result);
          }
        })
        .error(function Error(msg, status, headers, config) {
          //TODO Wywalic (?)
          console.log('error error');
          console.log(msg);
          console.log(status);
          console.log(headers);
          deferred.resolve([{
            "name": "Primera",
            "address": "http://primera.e-sim.org/mobile"
          }, {
            "name": "Secura",
            "address": "http://secura.e-sim.org/mobile"
          }, {
            "name": "Suna",
            "address": "http://suna.e-sim.org/mobile"
          }, ]);
        })
        .finally($ionicLoading.hide);
      return deferred.promise;
    }



  }

})();

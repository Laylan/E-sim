(function () {
    'use strict';

    angular
      .module('interceptors.module')
      .factory('TokenHeader', TokenHeader);

    TokenHeader.$inject = ['$rootScope'];

    function TokenHeader($rootScope) {
      return {
        request: returnRequest
      };

      function returnRequest(config) {
        if ($rootScope.loggedPlayer) {
          config.headers['token'] = $rootScope.token;
        }
        return config;
      }
    }

})();

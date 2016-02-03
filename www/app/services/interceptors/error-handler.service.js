(function () {
  'use strict';

  angular
    .module('interceptors.module')
    .factory('ErrorHandler', ErrorHandler);

  ErrorHandler.$inject = ['$q', '$injector'];

  function ErrorHandler($q, $injector) {
    return {
      requestError: redirectToLogin,
      responseError: redirectToLogin
    };

    function redirectToLogin(rejection) {
      $injector.get('$state').go('login');
      return $q.reject(rejection);
    }
  }

})();

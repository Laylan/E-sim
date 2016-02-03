(function () {
  'use strict';

  angular
    .module('filters.module')
    .filter('capitalize', capitalize);

  function capitalize() {

    return capitalizeFilter;

    ////////////////

    function capitalizeFilter(input, scope) {
      return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
  }

})();

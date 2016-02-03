(function () {
  'use strict';

  angular
    .module('filters.module')
    .filter('getById', getById);

  function getById() {

    return getByIdFilter;

    ////////////////

    function getByIdFilter(input, id) {
      var i = 0,
        len = input.length;
      for (; i < len; i++) {
        if (+input[i].currencyId == +id) {
          return input[i];
        }
      }
      return null;
    }
  }

})();

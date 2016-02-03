(function () {
  'use strict';

  angular
    .module('filters.module')
    .filter('flags', flags);

  function flags() {

    return flagsFilter;

    ////////////////

    function flagsFilter(text) {
      if (text !== undefined) {
        return text.split(' ').join('-');
      }
      return '';
    }
  }

})();

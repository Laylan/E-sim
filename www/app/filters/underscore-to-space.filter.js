(function () {
  'use strict';

  angular
    .module('filters.module')
    .filter('underscoreToSpace', underscoreToSpace);

  function underscoreToSpace() {

    return underscoreToSpaceFilter;

    ////////////////

    function underscoreToSpaceFilter(text) {
      if (text !== undefined) {
        return text.split('_').join(' ');
      }
      return '';
    }
  }

})();

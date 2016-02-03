(function () {
  'use strict';

  angular
    .module('filters.module')
    .filter('avatar', avatar);

  function avatar() {

    return avatarFilter;

    ////////////////

    function avatarFilter(url, size) {
      if (url !== undefined) {
        return url.split('_')[0] + '_' + size;
      }
      return '';
    }
  }

})();

(function () {
  'use strict';

  angular
    .module('filters.module')
    .filter('htmlFormat', html);

  function html() {

    return htmlFilter;

    ////////////////

    function htmlFilter(text) {
      if (text !== undefined) {
        return text.replace(/(<.[\w\s\=\/\.\,\?\:\_\&\-\#\"\_\;\\]*>)/g, '').replace('&#9733;','');
        // return text
        // .replace(/(<.[\w\s\=\/\.\,\?\:\_\&\-\#\"\_\\]*>)/g, ""); //linijka czyszcząca niechiane znaki zawsze na koncu
      }
      return '';
    }
  }

})();

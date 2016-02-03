(function () {
  'use strict';

  angular
    .module('esim-app')
    .value('Toast', function Toast( /* varargs */ ) {
      angular.forEach(arguments, function (msg) {
        console.log("TOAST: " + msg);
        if (window.plugins) { //Czy dzialamy na urzadzeniu, czy w przegladarce?
          window.plugins.toast.showShortCenter(msg);
        }
      });
    })
    .value('FindOne', function FindOne(array, predicate) {
      for (var i = array.length - 1; i >= 0; i--) {
        if (predicate(array[i])) {
          return array[i];
        }
      }
      return null;
    });

})();

(function () {
  'use strict';

  angular
    .module('tags.module')
    .directive('backButton', backButton);

  /* @ngInject */
  function backButton() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      restrict: 'E',
      link: link,
      templateUrl: 'app/directives/back-button.tpl.html'
    };

    return directive;

    function link($scope, $element, $attrs, $controller) {
      $element.bind('click', function () {
        window.history.back();
      });
    }
  }
})();

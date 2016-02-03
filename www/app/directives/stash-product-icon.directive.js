(function () {
  'use strict';

  angular
    .module('tags.module')
    .directive('stashProductIcon', stashProductIcon);

  /* @ngInject */
  function stashProductIcon() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        resource: '@',
        quality: '@',
        quantity: '@'
      },
      controllerAs: 'stashProductDirective',
      link: link,
      templateUrl: 'app/directives/stash-product-icon.tpl.html'
    };

    return directive;

    function link($scope, $element, $attrs, $controller) {
      var stars = {};
      for (var i = 0; i < 5; i++) {

        if (i < $scope.quality) {
          stars[i] = 'icon-star3';
        } else {
          stars[i] = 'icon-star-o';
        }
      }
      $scope.stars = stars;
    }
  }
})();

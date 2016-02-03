(function () {
  'use strict';

  angular
    .module('tags.module')
    .directive('productIcon', productIcon);

  /* @ngInject */
  function productIcon() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        resource: '@',
        quality: '@'
      },
      controllerAs: 'productDirective',
      link: link,
      templateUrl: 'app/directives/product-icon.tpl.html'
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

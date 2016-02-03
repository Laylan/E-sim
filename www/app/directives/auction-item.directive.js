(function () {
  'use strict';

  angular
    .module('tags.module')
    .directive('auctionItem', auctionItem);

  /* @ngInject */
  function auctionItem() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        icon: '@',
        name: '@',
        price: '@',
        time: '@'
      },
      link: link,
      templateUrl: 'app/directives/auction-item.tpl.html'
    };

    return directive;

    function link($scope, $element, $attrs, $controller) {

    }
  }

})();

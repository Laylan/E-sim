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
        time: '@',
        // auctItem: "="
      },
      link: link,
      templateUrl: 'app/directives/auction-item.tpl.html'
    };
console.log(directive);
    return directive;

    function link($scope, $element, $attrs, $controller) {

    }
  }

})();

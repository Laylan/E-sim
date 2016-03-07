(function () {
  'use strict';

  angular
    .module('tags.module')
    .directive('equipmentItem', equipmentItem);

  /* @ngInject */
  function equipmentItem() {
    // Usage:
    //
    // Creates:
    //
    console.log('###########uzycie dyrektywy');
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        icon: '@',
        slot: '@',
        quality: '@',
        parameters: "="
      },
      link: link,
      templateUrl: 'app/directives/equipment-item.tpl.html'
    };
console.log('directive');
console.log(directive);
    return directive;

    function link($scope, $element, $attrs, $controller) {

    }
  }

})();

(function () {
  'use strict';

  angular
    .module('tags.module')
    .directive('specialItemIcon', specialItemIcon);

  /* @ngInject */
  function specialItemIcon() {
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
        quantity: '@',
        nextusagetime: '@'
      },
      controllerAs: 'specialItemIcon',
      link: link,
      templateUrl: 'app/directives/special-item-icon.tpl.html'
    };

    return directive;

    function link($scope, $element, $attrs, $controller) {

      var date = new Date($scope.nextusagetime * 1);
      $scope.nextAsText =date.getDate()+ "/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+ date.getFullYear()+ " "+
      (date.getHours()<10?'0':'') + date.getHours()+":"+(date.getMinutes()<10?'0':'') + date.getMinutes();
      if ($scope.nextAsText==="NaN/aN/NaN NaN:NaN") {
        $scope.nextAsText="";
      }



    }
  }
})();

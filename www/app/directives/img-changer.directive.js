(function() {
'use strict';

  angular
    .module('tags.module')
    .directive('imgChanger', imgchanger);

    function imgchanger(){


      var directive={
        restrict: 'AC',
        link: link

      };
      return directive;

      function link($scope, $elm, $attr) {

        $elm.bind('click', function () {
          console.log("jakis tekst");
           $attr.$set('src',$attr.newsrc);
         });
       }
    }
})();

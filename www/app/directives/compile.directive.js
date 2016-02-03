angular.module('tags.module')
.directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        return scope.$eval(attrs.compile);
      },
      function(value) {
        element.html(value);
        $compile(element.contents())(scope);
      }
   )};
   }])
   //.controller('MyCtrl', function($scope) {
//     var str = 'hello http://www.cnn.com';
//     var urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
//     result = str.replace(urlRegEx, "<a ng-click=\"GotoLink('$1',\'_system\')\">$1</a>");
//     $scope.GotoLink = function() { alert(); }
//     $scope.name = result;
// });

app.directive('ngBindHtmlCompile', ['$compile', function ($compile) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(function () {
        return scope.$eval(attrs.ngBindHtmlCompile);
      }, function (value) {
        element.html(value);
        $compile(element.contents())(scope);
      });
    }
  };
}]);
app.directive('slick', ['$timeout', function($timeout){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      slick: "=",
      reload: "="
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // templateUrl: '',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      var flkty;
      $scope.$watch('reload', function (reload) {
        if (reload) {
          $timeout(function () {
            if (flkty) {
              flkty.destroy()
            }
            flkty = new Flickity(iElm[0], {
              cellAlign: 'left',
              contain: true
            });
          })
        }
      })
    }
  };
}]);
app.directive('navLink', ['Sign', function (Sign) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      sref: "=sref"
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    template: function (iElm, iAttrs) {
      return '<a class="nav__link" md-ink-ripple="" ui-sref="'+iAttrs.sref+'" ui-sref-active="active"><ng-transclude></ng-transclude></a>'
    },
    // templateUrl: '',
    replace: true,
    transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      if (iAttrs.signOnly && !gon.current_user) {
        iElm.bind('click', function (event) {
          Sign.isShow = true;
          $scope.$apply();
          event.preventDefault();
          event.stopPropagation();
        })
      }
    }
  };
}]);
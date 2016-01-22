app.directive('positionsTable', ['$mdMedia', 'Position', '$timeout', '$rootScope', function ($mdMedia, Position, $timeout, $rootScope) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      order: "=",
      offset: "=",
      searchCallback: "=",
      collection: "=",
      limit: "=",
      promise: "=",
      hideMore: "=",
      minWidth: "="
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    templateUrl: 'positions_table.html',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      $scope.gon = gon;

      $scope.Position = Position;

      window.onresize = function () {
        $rootScope.safeApply(function () {
          var el = iElm[0].querySelector('.table-wrapper');
          if (el)
            $scope.full = el.offsetWidth >= $scope.minWidth;
        })
      }

      $scope.$on("$destroy", function () {
        window.onresize = undefined;
      })

      $scope.$watch('collection', function (collection) {
        if (collection) {
          $timeout(function () {
            window.onresize();
          })
        }
      })

      $scope.callback = function () {
        $scope.offset = $scope.offset + $scope.limit;
        $timeout(function () {
          $scope.searchCallback($scope.offset)
        })
      }
    }
  };
}]);
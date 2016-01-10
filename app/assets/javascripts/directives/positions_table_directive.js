app.directive('positionsTable', ['$mdMedia', 'Position', '$timeout', function ($mdMedia, Position, $timeout) {
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
      hideMore: "="
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

      $scope.$watch(function () {
        return $mdMedia('max-width: 1165px')
      }, function (media) {
        $scope.lt1120px = media;
      })

      $scope.$watch(function () {
        return $mdMedia('min-width: 1166px')
      }, function (media) {
        $scope.gt1120px = media;
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
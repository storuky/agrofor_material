app.directive('favorite', ['Position', function (Position) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      position: "="
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    template: '<i class="icon-star" ng-class="{active: isFavorite(position.id)}" ng-click="toggleFavorite(position.id, $event)"></i>',
    // templateUrl: '',
    replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      $scope.toggleFavorite = function (id, $event) {
        Position.toggle_favorite({id: id}, function (res) {
          gon.favorite_ids = res;
        })
        $event.stopPropagation();
      }

      $scope.isFavorite = function (id) {
        return gon.current_user && gon.favorite_ids.indexOf(id)!=-1
      }
    }
  };
}]);
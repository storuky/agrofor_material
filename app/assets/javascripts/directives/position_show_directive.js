app.directive('positionShow', ['$location', function ($location) {
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
    templateUrl: 'position_show.html',
    // templateUrl: '',
    replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      $scope.gon = gon;

      $scope.zoomToPosition = function () {
        var location = '/search/map?zoom_to='+$scope.position.lat + '&zoom_to=' + $scope.position.lng;

        if ($scope.position.type=="Offer") {
          location += ('&type=offer&offer_id=' + $scope.position.id)
        }
        return location;
      }
    }
  };
}]);
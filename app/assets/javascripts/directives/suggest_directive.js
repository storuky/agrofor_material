app.directive('suggest', ['$timeout', 'Map', function ($timeout, Map) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      ngModel: "=",
      coords: "=",
      lat: "=",
      lng: "=",
      country: "=",
      rebuild: "=",
      radius: "=",
      boundedBy: "="
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // templateUrl: '',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      var suggestView;
      function build () {
        suggestView = new ymaps.SuggestView(iElm[0]);
        suggestView.events.add('select', function (e) {
          $scope.ngModel = iElm[0].value;

          if ($scope.ngModel) {
            ymaps.geocode($scope.ngModel).then(function (res) {
              try {
                var coords = res.geoObjects.get(0).geometry.getCoordinates();
                $scope.country = res.geoObjects.get(0).properties.get('description');
                $scope.boundedBy = res.geoObjects.get(0).properties.get('boundedBy');
                $scope.radius = Map.measure($scope.boundedBy[0][0], $scope.boundedBy[0][1], $scope.boundedBy[1][0], $scope.boundedBy[0][1]) / 2;
                $scope.lat = coords[0];
                $scope.lng = coords[1];
                $scope.coords = coords;
                $scope.$apply();
              } catch (e) {
                console.error(e)
              }
            });
          } else {
            $scope.coords = undefined;
          }

          $scope.$apply();
        });
      }
      ymaps.ready(function () {
        build();
        $scope.$watch('ngModel', function (model) {
          if (!model) {
            $scope.coords = undefined;
            $scope.lat = undefined;
            $scope.lng = undefined;
            $scope.radius = undefined;
            $scope.country = undefined;
            $scope.boundedBy = undefined;
          }
        })

        $scope.$watch('rebuild', function (val) {
          suggestView.destroy();
          build();
        })

      });
    }
  };
}]);
app.directive('map', ['Map', '$timeout', '$mdMedia', function (Map, $timeout, $mdMedia) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // templateUrl: '',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      var center = [55.7, 37.6];

      ymaps.ready(function () {
        $timeout(function () {
          var map = new ymaps.Map(iElm[0], {
              center: $scope.coords || center,
              zoom: $scope.zoom || 10,
              controls: [],
            }, {
              maxZoom: $scope.maxZoom || 15,
              suppressMapOpenBlock: true,
          });

          $scope.$watch(function () {
            return $mdMedia('gt-md')
          }, function (v) {
            $timeout(function () {
              map.container.fitToViewport()
            }, 600)
          })
        })
      })
    }
  };
}]);
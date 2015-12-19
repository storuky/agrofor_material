app.directive('images', ['Image', function (Image) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      ngModel: "=",
      allowDestroy: "=",
      upload: "="
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    templateUrl: 'images.html',
    replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      $scope.Routes = Routes;

      $scope.destroy = function (document, $event) {
        Image.destroy({id: document.id}, function () {
          $scope.ngModel = _.select($scope.ngModel, function (model) {
            return model.id!=document.id;
          })
        })
        $event.stopPropagation();
        $event.preventDefault();
      }
    }
  };
}]);
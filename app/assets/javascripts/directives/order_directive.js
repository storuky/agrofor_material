app.directive('order', [function(){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      ngModel: "=",
      value: "="
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    template: '<div class="order" ng-click="switch()" ng-class="{active: ngModel == value || ngModel == value + \' DESC\'}">' 
            + '<ng-transclude></ng-transclude>'
            + '<i class="icon-sort-ascending" ng-show="ngModel == value"></i>'
            + '<i class="icon-sort-descending" ng-show="ngModel == value + \' DESC\'"></i>'
            + '</div>',
    // templateUrl: '',
    replace: true,
    transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      $scope.switch = function () {
        if ($scope.ngModel == $scope.value + ' DESC') {
          $scope.ngModel = $scope.value
        } else  {
          $scope.ngModel = $scope.value + ' DESC'
        }
      }
    }
  };
}]);
app.directive('positionInfo', [function () {
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
    template: '<div class="position-info">'
                + '<b>{{::position.created_at | date:"dd.MM.yyyy"}}</b>'
                + '<b>{{::position.title}}</b>'
                + '<span>{{::position.option.title}}</span>'
                + '<span>{{::position.weight}} {{::position.weight_dimension.title}}, мин. {{::position.weight_min}} {{::position.weight_min_dimension.title}}, {{::position.price}} {{::position.currency.title}}/{{::position.price_weight_dimension.title}}</span>'
            + '</div>',
    // templateUrl: '',
    replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      
    }
  };
}]);
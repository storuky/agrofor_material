app.directive('sidebar', ['Sidebar', '$mdMedia', '$compile', function (Sidebar, $mdMedia, $compile) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'C', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // templateUrl: '',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      $scope.Sidebar = Sidebar;

      var backdrop = $compile('<md-backdrop ng-show="Sidebar.isOpen" ng-click="Sidebar.close()" class="md-sidenav-backdrop md-opaque"></md-backdrop>')($scope);
      iElm.after(backdrop)
      
      $scope.$watch(function () {
        return Sidebar.isOpen
      }, function (isOpen) {
        if (isOpen) {
          iElm.addClass('opened')
        } else {
          iElm.removeClass('opened')
        }
      })

      $scope.$watch(function () {
        return $mdMedia('gt-md')
      }, function (v) {
        Sidebar.close();
        iElm.removeClass('opened');
      })
    }
  };
}]);

app.directive('toggleSidebar', ['Sidebar', function (Sidebar) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    template: '<i class="icon-menu toggle-nav"></i>',
    // templateUrl: '',
    replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      iElm.bind('click', function () {
        Sidebar.open();
        $scope.$apply();
      })
    }
  };
}]);
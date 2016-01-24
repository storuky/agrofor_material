app.directive("disableAnimate", ['$animate', function ($animate) {
    return function (scope, element) {
        $animate.enabled(false, element);
    };
}]);
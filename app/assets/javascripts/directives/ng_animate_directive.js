app.directive("disableAnimate", function ($animate) {
    return function (scope, element) {
        $animate.enabled(false, element);
    };
});
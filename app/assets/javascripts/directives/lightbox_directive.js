app.directive('lightbox', ['$compile', function($compile) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      images: "=",
      allowDestroy: "=",
      upload: "="
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    templateUrl: 'images.html',
    replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      var template;

      $scope.$watch('isShow', function (isShow) {
        if (isShow) {
          template = $compile(document.getElementById('lightbox.html').innerHTML)($scope);
          angular.element(document.body).append(template);
          wheelzoom(document.querySelectorAll('.lightbox__image'));
        } else if (template) {
          template.remove();
        }
      })

      $scope.show = function ($index, $event) {
        $scope.isShow = true;
        $scope.activeImage = $index;
        $event.preventDefault();
      }

      $scope.destroy = function (document, $event) {
        Image.destroy({id: document.id}, function () {
          $scope.ngModel = _.select($scope.ngModel, function (model) {
            return model.id!=document.id;
          })
        })
        $event.stopPropagation();
        $event.preventDefault();
      }

      $scope.prev = function () {
        $scope.activeImage = $scope.activeImage!=0 ? $scope.activeImage-1 : $scope.images.length-1;
        if (template[0].querySelector('.lightbox__footer').scrollLeft > -100 + template[0].querySelector('.lightbox__footer__image.active').offsetLeft)
          template[0].querySelector('.lightbox__footer').scrollLeft = -110 + template[0].querySelector('.lightbox__footer__image.active').offsetLeft;
        if ($scope.activeImage == $scope.images.length-1)
          template[0].querySelector('.lightbox__footer').scrollLeft = template[0].querySelector('.lightbox__footer').offsetWidth;
      }

      $scope.next = function () {
        $scope.activeImage = $scope.activeImage!=$scope.images.length-1 ? $scope.activeImage+1 : 0;
        if (document.body.offsetWidth - 250 < document.querySelector('.lightbox__footer__image.active').offsetLeft)
          template[0].querySelector('.lightbox__footer').scrollLeft = 300 - document.body.offsetWidth + template[0].querySelector('.lightbox__footer__image.active').offsetLeft;
        if ($scope.activeImage == 0)
          template[0].querySelector('.lightbox__footer').scrollLeft = 0;
      }
    }
  };
}]);
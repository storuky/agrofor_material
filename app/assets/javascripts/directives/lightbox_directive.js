app.directive('lightbox', ['$compile', '$timeout', function($compile, $timeout) {
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
      $scope.scale = 0;

      $scope.$watch('images', function (images) {
        if ($scope.upload && images) {
          $timeout(function () {
            iElm[0].scrollLeft = iElm[0].scrollWidth;
          }, 100)
        }
      }, true)

      function keydownManage ($event){
        if ($event.keyCode == 39)
          $scope.next();
        else if ($event.keyCode == 37)
          $scope.prev();

        $scope.$apply();
        $event.stopPropagation();
      }

      $scope.$watch('isShow', function (isShow) {
        if (isShow) {
          template = $compile(document.getElementById('lightbox.html').innerHTML)($scope);
          angular.element(document.body).append(template);

          document.addEventListener("keydown", keydownManage, false);
          // wheel(document.querySelector('.lightbox__images__overlay'));
          wheel(document.querySelector('.lightbox__image img'));
        } else if (template) {
          template.remove();
          document.removeEventListener("keydown", keydownManage, false)
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

      $scope.prev = function (stopIfScale) {
        if (stopIfScale && $scope.scale!=0) return false;
        $scope.scale = 0;
        if ($scope.activeImage!=0) {
          $scope.activeImage = $scope.activeImage-1;
          if (template[0].querySelector('.lightbox__footer').scrollLeft > -100 + template[0].querySelector('.lightbox__footer__image.active').offsetLeft)
            template[0].querySelector('.lightbox__footer').scrollLeft = -110 + template[0].querySelector('.lightbox__footer__image.active').offsetLeft;
        } else {
          $scope.activeImage = $scope.images.length-1;
          template[0].querySelector('.lightbox__footer').scrollLeft = template[0].querySelector('.lightbox__footer').offsetWidth;
        }
      }

      $scope.next = function (stopIfScale) {
        if (stopIfScale && $scope.scale!=0) return false;
        $scope.scale = 0;
        if ($scope.activeImage!=$scope.images.length-1) {
          $scope.activeImage = $scope.activeImage+1;
          if (document.body.offsetWidth - 250 < document.querySelector('.lightbox__footer__image.active').offsetLeft)
            template[0].querySelector('.lightbox__footer').scrollLeft = 300 - document.body.offsetWidth + template[0].querySelector('.lightbox__footer__image.active').offsetLeft;
        } else {
          $scope.activeImage = 0;
          template[0].querySelector('.lightbox__footer').scrollLeft = 0;
        }
      }

      function wheel (elem) {
        if (elem.addEventListener) {
          if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            elem.addEventListener("wheel", onWheel);
          } else if ('onmousewheel' in document) {
            // устаревший вариант события
            elem.addEventListener("mousewheel", onWheel);
          } else {
            // Firefox < 17
            elem.addEventListener("MozMousePixelScroll", onWheel);
          }
        } else { // IE8-
          elem.attachEvent("onmousewheel", onWheel);
        }

        function onWheel(e) {
          if ((e.deltaY < 0 && $scope.scale > -300) || (e.deltaY > 0 && $scope.scale < 0)) {
            $scope.scale += e.deltaY;
            if ($scope.scale>0) $scope.scale = 0;
            if ($scope.scale<-300) $scope.scale = -300;
          }
          $scope.$apply();
        }
      }      
    }
  };
}]);
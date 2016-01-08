app.directive('lightbox', ['$compile', '$timeout', '$rootScope', 'Image', function($compile, $timeout, $rootScope, Image) {
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
      var template, flkty, flktyLightbox;
      $scope.scale = 0;

      $scope.$watch('images', function (images) {
        if (images) {
          $timeout(function () {
            if (flkty) {
              flkty.destroy()
            }
            flkty = new Flickity(iElm[0].querySelector('.uploaded-images__container'), {
              cellAlign: 'left',
              contain: true,
              freeScroll: true
            });

            flkty.on('staticClick', function (event, pointer, cellElement, cellIndex) {
              if (event.target.tagName == 'I') {
                var id = $scope.images[cellIndex].id;
                Image.destroy({id: id}, function () {
                  $scope.images = _.select($scope.images, function (image) {
                    return image.id != id;
                  })
                })
              } else {
                $scope.show(cellIndex, event);
                $scope.$apply();
              }
            })

            flkty.resize()
          });
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
          $rootScope.blurPage = true;
          template = $compile(document.getElementById('lightbox.html').innerHTML)($scope);
          angular.element(document.body).append(template);

          document.addEventListener("keydown", keydownManage, false);
          // wheel(document.querySelector('.lightbox__image img'));

          $timeout(function () {
            flktyLightbox = new Flickity(template[0].querySelector('.lightbox__images'), {
              cellAlign: 'left',
              contain: true,
              selectedAttraction: 0.2,
              friction: 0.8,
              lazyLoad: true
            });

            flktyLightboxMin = new Flickity(template[0].querySelector('.lightbox__footer'), {
              cellAlign: 'center',
              contain: true,
              freeScroll: true
            });

            flktyLightboxMin.stopPlayer();

            flktyLightbox.select($scope.activeImage)

            // flktyLightboxMin.on('cellSelect', function (event, pointer, cellElement, cellIndex) {
            //   if (flktyLightbox.selectedIndex != flktyLightboxMin.selectedIndex)
            //     flktyLightbox.select(flktyLightboxMin.selectedIndex)
            // })

            flktyLightboxMin.on('staticClick', function (event, pointer, cellElement, cellIndex) {
              if (flktyLightbox.selectedIndex != cellIndex)
                flktyLightbox.select(cellIndex);
            })

            flktyLightbox.on('cellSelect', function () {
              if (flktyLightbox.selectedIndex != flktyLightboxMin.selectedIndex) {
                $scope.activeImage = flktyLightbox.selectedIndex;
                $scope.$apply();
                flktyLightboxMin.select(flktyLightbox.selectedIndex);
              }
            })
          })
        } else if (template) {
          $rootScope.blurPage = false;
          template.remove();
          flktyLightbox.destroy()
          flktyLightboxMin.destroy()
          document.removeEventListener("keydown", keydownManage, false)
        }
      })

      $scope.show = function ($index, $event) {
        $scope.isShow = true;
        $scope.activeImage = $index;
        if (flktyLightbox) {
          flktyLightbox.select($index);
          flktyLightboxMin.select($index);
        }
        $event.preventDefault();
      }
    }
  };
}]);
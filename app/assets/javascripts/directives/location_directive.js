app.directive('location', ['$timeout', 'Map', '$mdMedia', '$timeout', function ($timeout, Map, $mdMedia, $timeout) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      draggable: "=draggable",
      info: "=info"
    }, // {} = isolate, true = child, false/undefined = no change
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

          var marker = new ymaps.Placemark(
              $scope.info.lng ? [$scope.info.lat, $scope.info.lng] : center, serializePosition(), {
                iconLayout: Map.markerLayout,
                iconPane: 'overlaps',
                draggable: $scope.draggable
              }
            )

          map.geoObjects.add(marker)

          map.events.add('click', function (e) {
            marker.geometry.setCoordinates(e.get('coords'))
            fillGeodata(e.get('coords'))
          });

          marker.events.add('dragend', function(e) {
            var thisPlacemark = e.get('target');
            var coords = thisPlacemark.geometry.getCoordinates();
            fillGeodata(coords);
          });

          $scope.$watch('info', function (info) {
            marker.properties.set(serializePosition());
            if (info.lat && info.lng) {
              var coords = [info.lat, info.lng];
              marker.geometry.setCoordinates(coords);
              map.setCenter(coords);
            }
          }, true)

          $scope.$watch(function () {
            return $mdMedia('gt-md')
          }, function (v) {
            $timeout(function () {
              map.container.fitToViewport()
            }, 600)
          })


          /*
          *  Lib
          */

          function fillGeodata (coords) {
            ymaps.geocode(coords).then(function (res) {
              // $scope.info.city = res.geoObjects.get(0).properties.get('description');
              $scope.info.address = res.geoObjects.get(0).properties.get('description') + ' ' + res.geoObjects.get(0).properties.get('name');
              $scope.info.lat = coords[0];
              $scope.info.lng = coords[1];
              $scope.$apply()
            })
          }

          function serializePosition () {
            var info = {
              weight: $scope.info.weight || 0,
              trade_type: $scope.info.trade_type_id ? gon.data.by_index.trade_types[$scope.info.trade_type_id].title : "Тип",
              title: $scope.info.option ? $scope.info.option.title : 'Категория',
              weight_dimension: $scope.info.weight_dimension_id ? gon.data.by_index.weight_dimensions[$scope.info.weight_dimension_id].title : "",
              price: $scope.info.price || "0",
              currency: gon.settings.currency.title,
              price_weight_dimension: $scope.info.price_weight_dimension_id ? gon.data.by_index.weight_dimensions[$scope.info.price_weight_dimension_id].title : "",
            }

            return info;
          }
        })
      })
    }
  };
}]);
app.directive('map', ['Map', 'Search', '$timeout', '$mdMedia', 'Position', '$rootScope', function (Map, Search, $timeout, $mdMedia, Position, $rootScope) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      map: "="
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // templateUrl: '',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      var center = [55.7, 37.6],
          geoObjects = [],
          clusterer,
          maxZoom = 17;

      function buildMap () {
        clusterer = new ymaps.Clusterer({
          clusterIconLayout: Map.clustererLayout,
          gridSize: 256,
          clusterBalloonLayout: ymaps.templateLayoutFactory.createClass(""),
          clusterBalloonShadow: false
        });

        $scope.map = new ymaps.Map(iElm[0], {
            center: center,
            zoom: $scope.zoom || 10,
            controls: [],
          }, {
            maxZoom: maxZoom,
            suppressMapOpenBlock: true,
        });

        $scope.map.events.add('click', function (e) {
          console.log(e.get('coords'))
        })

        $scope.map.events.add('boundschange', function (e) {
          $rootScope.safeApply(function () {
            Search.visible_count = ymaps.geoQuery(geoObjects).searchIntersect($scope.map).getLength();
          })
        });

        clusterer.events.add('click', function (event) {
          if ($scope.map.getZoom()==maxZoom) {
            var ids = _.map(event.get('target').getGeoObjects(), function (object) {
              return object.properties._data.id
            });

            Position.openClusterModal(ids);
          }
        });

        $scope.$watch(function () {
          return Search.positions
        }, drawMarkers, false)

        $scope.$watch(function () {
          return Search.tags
        }, drawCircles, true)

        resizeMap();
      }


      function drawMarkers (markers) {
        $scope.map.geoObjects.removeAll();
        clusterer.removeAll();
        geoObjects = [];

        _.each(markers, function (marker) {
          var coords = [marker[1], marker[2]],
              properties = shortMarkerProperties(marker);

          geoObjects.push(new ymaps.Placemark(
            coords, properties, {
              iconLayout: Map.markerLayout,
              iconPane: 'overlaps'
            })
          );
        })

        clusterer.add(geoObjects);
        $scope.map.geoObjects.add(clusterer);

        if (markers.length)
          $scope.map.setBounds($scope.map.geoObjects.getBounds());
      }

      function drawCircles (tags) {
        setTimeout(function () {
          _.each(tags, function (tag) {
            if (tag.bounded_by) {
              var circle = new ymaps.Circle([
                   // Координаты центра круга
                   tag.coords,
                   // Радиус круга в метрах
                   tag.default_radius + (tag.radius * 1000 || 0)
              ], {}, {
                fill: false,
               // fillColor: 'rgba(255, 219, 76, 0.5)',
               strokeColor: 'rgba(215, 185, 64, 0.6)',
               strokeWidth: 3
              });

              $scope.map.geoObjects.add(circle)
            }
          })
        }, 300)
      }

      function shortMarkerProperties (marker) {
        var title = gon.data.by_index.options[marker[4]],
            weight_dimension = gon.data.by_index.weight_dimensions[marker[6] || 1].title,
            price_weight_dimension = gon.data.by_index.weight_dimensions[marker[9] || 1].title;

        var result = {
          id: marker[0],
          trade_type: gon.data.by_index.trade_types[marker[3]].title || "Тип",
          title: title ? title.title : "Категория",
          weight: marker[5] || 0,
          weight_dimension: weight_dimension,
          price: (marker[7] * gon.data.rates[marker[8]].rate).toFixed(2) || 0,
          currency: gon.settings.currency.title,
          price_weight_dimension: price_weight_dimension,
          coords: [marker[1], marker[2]]
        }

        return result;
      }

      function resizeMap () {
        $scope.$watch(function () {
          return $mdMedia('gt-md')
        }, function (v) {
          $timeout(function () {
            $scope.map.container.fitToViewport()
          }, 600)
        })
      }

      ymaps.ready(function () {
        $timeout(function () {
          buildMap()
        })
      })
    }
  };
}]);
app.directive('map', ['Map', 'Search', '$timeout', '$mdMedia', 'Position', '$rootScope', function (Map, Search, $timeout, $mdMedia, Position, $rootScope) {
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
      var map,
          center = [55.7, 37.6],
          geoObjects = [],
          clusterer;

      function buildMap () {
        clusterer = new ymaps.Clusterer({
          clusterIconLayout: Map.clustererLayout,
          gridSize: 256,
          clusterBalloonLayout: ymaps.templateLayoutFactory.createClass(""),
          clusterBalloonShadow: false
        });

        map = new ymaps.Map(iElm[0], {
            center: center,
            zoom: $scope.zoom || 10,
            controls: [],
          }, {
            maxZoom: $scope.maxZoom || 15,
            suppressMapOpenBlock: true,
        });

        window.map = map

        map.events.add('boundschange', function (e) {
          $rootScope.safeApply(function () {
            Search.visible_count = ymaps.geoQuery(geoObjects).searchIntersect(map).getLength();
          })
        });

        clusterer.events.add('click', function (event) {
          if (map.getZoom()==15) {
            var ids = _.map(event.get('target').getGeoObjects(), function (object) {
              return object.properties._data.id
            });

            Position.openClusterModal(ids);
          }
        });

        $scope.$watch(function () {
          return Search.positions
        }, function (markers) {
          drawMarkers(markers)
        })

        resizeMap();
      }


      function drawMarkers (markers) {
        map.geoObjects.removeAll();
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
        map.geoObjects.add(clusterer);

        if (markers.length)
          map.setBounds(map.geoObjects.getBounds());
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
            map.container.fitToViewport()
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
app.controller('SearchCtrl', ['$scope', 'action', 'Search', '$location', 'Position', '$timeout', '$state', '$mdMedia', function ($scope, action, Search, $location, Position, $timeout, $state, $mdMedia) {
  var ctrl = this;

  $scope.Search = Search;

  if (gon.current_user)
    ctrl.positions = Position.get({status: "opened"})

  $scope.$on('$destroy', function () {
    Search.positions = undefined;
  })

  action('map', function () {
    Search.type = 'map';

    $scope.$watch(function () {
      return $location.search()
    }, function () {
      var id = $location.search().id,
          ids = $location.search().ids,
          zoom_to = $location.search().zoom_to;

      if (id) {
        Position.openModal({id: id});
      } else if (ids) {
        Position.openClusterModal(ids);
      } else if (zoom_to) {
        console.log(zoom_to)
        $scope.center = zoom_to;
        $scope.zoom = 15;
        if ($scope.map) {
          $scope.map.setCenter(zoom_to);
          $scope.map.setZoom(15);
        }
        Position.closeModal();
      }
    }, true)
  });

  action('list', function () {
    Search.type = 'list';
  });

  action(['list', 'map'], function () {
    $scope.$watch(function () {
      return [Search.tags, Search.query, Search.order]
    }, function () {
      if (Search.query !== undefined || Search.tags !== undefined || Search.order !== undefined) {
        Search.byParams();
      }
    }, true)

    $scope.$watch(function () {
      return Search.order
    }, function (order) {
      if (order !== undefined) {
        Search.offset = 0;
      }
    })
  })

  action('map', function () {
    
  })

  $scope.$on('$destroy', function () {
    Search.type = undefined;
    Position.closeModal();
  })

}])
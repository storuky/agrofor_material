app.controller('SearchCtrl', ['$scope', 'action', 'Search', '$location', 'Position', '$timeout', '$state', '$mdMedia', '$timeout', '$http', function ($scope, action, Search, $location, Position, $timeout, $state, $mdMedia, $timeout, $http) {
  var ctrl = this;

  $scope.Search = Search;

  if (gon.current_user)
    $http.get(Routes.my_positions_path()).then(function (res) {
      ctrl.positions = res.data;
    })

  $scope.$on('$destroy', function () {
    Search.positions = undefined;
  })

  action('map', function () {
    Search.type = 'map';

    var pm;

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
      Search.offset = 0;
      if (Search.query !== undefined || Search.tags !== undefined || Search.order !== undefined) {
        $timeout(function () {
          Search.byParams();
        })
      }
    }, true)
  })

  action('map', function () {
    
  })

  $scope.$on('$destroy', function () {
    Search.type = undefined;
    Position.closeModal();
  })

}])
app.controller('SearchCtrl', ['$scope', 'action', 'Search', '$location', 'Position', '$timeout', '$state', function ($scope, action, Search, $location, Position, $timeout, $state) {
  var ctrl = this;

  $scope.Search = Search;

  if (gon.current_user)
    ctrl.positions = Position.query({status: "opened"})

  action('map', function () {
    Search.type = 'map';

    $scope.$watch(function () {
      return $location.search()
    }, function () {
      var id = $location.search().id,
          ids = $location.search().ids;

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
      return [Search.tags, Search.query]
    }, function () {
      if (Search.query !== undefined || Search.tags !== undefined) {
        Search.byParams();
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
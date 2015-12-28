app.controller('SearchCtrl', ['$scope', 'action', 'Search', '$location', 'Position', function ($scope, action, Search, $location, Position) {
  var ctrl = this,
      id = $location.search().id
      ids = $location.search().ids;

  $scope.Search = Search;

  action('map', function () {
    Search.type = 'map';

    if (id) {
      Position.openModal(id);
    } else if (ids) {
      Position.openClusterModal(ids);
    }
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

  $scope.$on('$destroy', function () {
    Search.type = undefined;
    Position.closeModal();
  })

}])
app.controller('SearchCtrl', ['$scope', 'action', 'Search', '$location', 'Position', function ($scope, action, Search, $location, Position) {
  var ctrl = this,
      id = $location.search().id;

  $scope.Search = Search;

  action('map', function () {
    Search.type = 'map';

    if (id) {
      Position.openModal(id);
    }
  });

  action('list', function () {
    Search.type = 'list';
  });

  action(['list', 'map'], function () {
    $scope.$watch(function () {
      return Search.tags
    }, function (tags) {
      if (tags !== undefined) {
        Search.byParams(tags);
      }
    }, true)
  })

  $scope.$on('$destroy', function () {
    Search.type = undefined;
    Position.closeModal();
  })

}])
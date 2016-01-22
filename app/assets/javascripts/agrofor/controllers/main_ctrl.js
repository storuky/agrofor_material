app.controller('MainCtrl', ['$scope', '$state', '$rootScope', '$mdMedia', 'Sidebar', 'Search', function ($scope, $state, $rootScope, $mdMedia, Sidebar, Search) {
  $scope.$watch(function () {
    return $state.current.name
  }, function () {
    Sidebar.close()
  })

  $scope.$state = $state;

  $scope.Search = Search;
}])
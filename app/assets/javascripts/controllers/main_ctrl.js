app.controller('MainCtrl', ['$scope', '$state', '$rootScope', '$mdMedia', 'Sidebar', function ($scope, $state, $rootScope, $mdMedia, Sidebar) {
  $scope.$watch(function () {
    return $state.current.name
  }, function () {
    Sidebar.close()
  })

  $scope.$state = $state;
}])
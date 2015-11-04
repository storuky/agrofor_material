app.controller('MainCtrl', ['$scope', '$state', '$mdSidenav', '$rootScope', '$mdMedia', function ($scope, $state, $mdSidenav, $rootScope, $mdMedia) {
  $scope.$watch(function () {
    return $state.current.name
  }, function () {
    $mdSidenav('left').close();
  })
}])
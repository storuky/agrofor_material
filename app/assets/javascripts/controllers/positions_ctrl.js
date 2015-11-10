app.controller('PositionsCtrl', ['$scope', '$stateParams', 'action', 'Position', 'Cache', '$timeout', function ($scope, $stateParams, action, Position, Cache, $timeout) {
  var ctrl = this;


  action('index', function () {
    $scope.Cache = Cache;

    ctrl.limitTo = 5;

    Position.query(function (res) {
      Cache.set('positions', res)
    });

  })

  action('new', function () {
    ctrl.save = Position.create;
  })

  action('edit', function () {
    ctrl.position = Position.edit({id: $stateParams.id})
    ctrl.save = Position.update;
  })
}])
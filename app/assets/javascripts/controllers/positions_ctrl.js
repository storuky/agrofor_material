app.controller('PositionsCtrl', ['$scope', '$stateParams', 'action', 'Position', 'Cache', function ($scope, $stateParams, action, Position, Cache) {
  var ctrl = this;


  action('index', function () {
    ctrl.limitTo = 5;

    // Position.query(function (res) {
    //   Cache.set('positions', res)
    // });
  })

  action('new', function () {
    ctrl.save = Position.create;
  })

  action('edit', function () {
    ctrl.position = Position.edit({id: $stateParams.id})
    ctrl.save = Position.update;
  })
}])
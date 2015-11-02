app.controller('PositionsCtrl', ['$scope', 'action', 'Position', function ($scope, action, Position) {
  var ctrl = this;

  action('index', function () {
    
  })

  action('new', function () {
    ctrl.save = Position.create
  })

  action('edit', function () {
    ctrl.save = Position.update
  })
}])
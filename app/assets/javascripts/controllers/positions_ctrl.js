app.controller('PositionsCtrl', ['$scope', 'action', 'Position', function ($scope, action, Position) {
  var ctrl = this;

  action('index', function () {
    $scope.messages = [{
          face : 'imagePath',
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        }, {
          face : 'imagePath',
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        }, {
          face : 'imagePath',
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        }, {
          face : 'imagePath',
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        }, {
          face : 'imagePath',
          what: 'Brunch this weekend?',
          who: 'Min Li Chan',
          when: '3:08PM',
          notes: " I'll be in your neighborhood doing errands"
        }];
  })

  action('new', function () {
    ctrl.save = Position.create
  })

  action('edit', function () {
    ctrl.save = Position.update
  })
}])
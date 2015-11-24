app.controller('MessagesCtrl', ['$scope', 'action', 'Message', '$state', function ($scope, action, Message, $state) {
  var ctrl = this;

  action('index', function () {
    if (!gon.current_user) {
      $state.go('map_path');
      Sign.isShow = true;
    }
  })
}])
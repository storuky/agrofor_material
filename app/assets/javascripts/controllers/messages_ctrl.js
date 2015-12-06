app.controller('MessagesCtrl', ['$scope', 'action', 'Message', '$state', '$timeout', function ($scope, action, Message, $state, $timeout) {
  var ctrl = this;

  action('index', function () {
    if (!gon.current_user) {
      $state.go('map_path');
      Sign.isShow = true;
    }

    $scope.$watch('ctrl.contact', function (contact) {
      scrollBottom()
    })
  })

  function scrollBottom () {
    $timeout(function () {
      var obj = document.querySelector('.message-page__messages');
      obj.scrollTop = obj.scrollHeight;
    })
  }
}])
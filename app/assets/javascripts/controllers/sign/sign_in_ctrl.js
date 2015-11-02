app.controller('SignInCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
  var ctrl = this;

  ctrl.cancel = function () {
    $mdDialog.cancel();
  }

  ctrl.answer = function(answer) {
    $mdDialog.hide(answer);
  }
}])
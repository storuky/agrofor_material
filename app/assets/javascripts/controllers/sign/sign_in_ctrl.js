app.controller('SignInCtrl', ['$scope', '$mdDialog', 'Sign', function ($scope, $mdDialog, Sign) {
  var ctrl = this;

  ctrl.cancel = function () {
    $mdDialog.cancel();
  }

  ctrl.sign_in = function(form) {
    if (Sign.in(form)) {
      $mdDialog.hide();
    }
  }
}])
app.run(['Sign', 'Sidebar', '$mdDialog', function (Sign, Sidebar, $mdDialog) {
  Sign.showLogin = function(ev) {
    Sidebar.close();
    $mdDialog.show({
      controller: 'SignInCtrl as ctrl',
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      console.log(answer)
    }, function() {
      // $scope.status = 'You cancelled the dialog.';
    });
  };
}])
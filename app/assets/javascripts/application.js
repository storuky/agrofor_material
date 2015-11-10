//= require oxymoron/angular
//= require oxymoron/angular-resource
//= require oxymoron/angular-animate
//= require oxymoron/angular-aria
//= require oxymoron/angular-touch
//= require oxymoron/angular-messages
//= require oxymoron/angular-ui-router
//= require oxymoron/underscore
//= require oxymoron/ng-notify
//= require oxymoron/perfect-scrollbar
//= require oxymoron/store
//= require oxymoron
//= require angular-material
//= require_self
//= require_tree .

var app = angular.module('app', ['ui.router', 'oxymoron', 'ngMaterial', 'ngMessages', 'ngTouch'])

app.run(['$rootScope', 'Sign', '$mdDialog', 'Cache', function ($rootScope, Sign, $mdDialog, Cache) {
  $rootScope._ = _;
  $rootScope.gon = gon;
  $rootScope.Sign = Sign;
  // $rootScope.Cache = Cache;

  Sign.showLogin = function(ev) {
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
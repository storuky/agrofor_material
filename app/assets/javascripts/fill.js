//= require oxymoron/angular
//= require oxymoron/angular-aria
//= require oxymoron/angular-touch
//= require oxymoron/angular-animate
//= require oxymoron/angular-resource
//= require oxymoron/angular-ui-router
//= require oxymoron/underscore
//= require oxymoron/ng-notify
//= require oxymoron
//= require angular-material
//= require_self
//= require_tree ./application/directives
//= require_tree ./application/services

var app = angular.module('app', ['ngMaterial', 'oxymoron'])

app.controller("FillCtrl", ["$scope", "Profile", '$timeout', function ($scope, Profile, $timeout) {
  var ctrl = this;
  $scope.gon = gon;

  Profile.get({id: gon.current_user.id}, function (res) {
    ctrl.user = res;
  })

  ctrl.save = function (data) {
    Profile.update(data, function (res) {
      window.location = "/search/map"
    }, function (res) {
      if (res.data.errors.first_name || res.data.errors.last_name)
        ctrl.tab = 1;
      else if (res.data.errors.address || res.data.errors.lat || res.data.errors.lng)
        ctrl.tab = 2;
      else if (res.data.errors.phones)
        ctrl.tab = 3;
    })
  };

  $scope.$watch('ctrl.tab', function (tab) {
    if (tab && $scope.map)
      $timeout(function () {
        $scope.map.container.fitToViewport()
      })
  })
}])
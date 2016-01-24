//= require oxymoron/angular
//= require oxymoron/angular-aria
//= require oxymoron/angular-touch
//= require oxymoron/angular-animate
//= require oxymoron/services/validate
//= require oxymoron/ng-notify
//= require angular-material
//= require_self

var app = angular.module('app', ['ngMaterial', 'oxymoron.services.validate', 'ngNotify'])

app.run(['ngNotify', function (ngNotify) {
  ngNotify.config({
    theme: 'pure',
    position: 'top',
    duration: 2000,
    type: 'info'
  });
}])

app.controller("LandingCtrl", ["$scope", "$http", "Validate", "ngNotify", function ($scope, $http, Validate, ngNotify) {
  var ctrl = this;

  $http.defaults.headers.common['X-CSRF-Token'] = document.querySelector('[name="csrf-token"]').content;

  ctrl.signIn = function (form, $event) {
    $http.post('/users/sign_in', form).then(function (res) {
      window.location = "/search/map"
    }, function (res) {
      ngNotify.set(res.data.msg, 'error');
    })
    $event.preventDefault();
  }

  ctrl.signUp = function (form, $event) {
    $http.post('/users', form).then(function (res) {
      window.location = "/search/map"
    }, function (res) {
      Validate("user", res.data.errors)
      ngNotify.set(res.data.msg, 'error');
    })

    $event.preventDefault();
  }
}])
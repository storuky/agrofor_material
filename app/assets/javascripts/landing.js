//= require oxymoron/angular
//= require oxymoron/angular-aria
//= require oxymoron/angular-touch
//= require oxymoron/angular-animate
//= require angular-material
//= require_self

var app = angular.module('app', ['ngMaterial'])

app.controller("LandingCtrl", ["$scope", "$http", function ($scope, $http) {
  var ctrl = this;

  $http.defaults.headers.common['X-CSRF-Token'] = document.querySelector('[name="csrf-token"]').content;

  ctrl.signIn = function (form, $event) {
    $http.post('/users/sign_in', form).then(function (res) {
      window.location = "/search/map"
    }, function (res) {
      alert(res.data.msg)
    })
    $event.preventDefault();
    $event.stopPropagation();
  }

  ctrl.signUp = function (form, $event) {
    $http.post('/users', form).then(function (res) {
      window.location = "/search/map"
    }, function (res) {
      alert(res.data.msg)
    })

    $event.preventDefault();
    $event.stopPropagation();
  }
}])
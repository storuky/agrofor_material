//= require oxymoron/angular
//= require oxymoron/angular-aria
//= require oxymoron/angular-touch
//= require oxymoron/angular-animate
//= require oxymoron/services/validate
//= require oxymoron/ng-notify
//= require angular-material
//= require_self

var app = angular.module('app', ['ngMaterial', 'oxymoron.services.validate', 'ngNotify'])

app.config(['$locationProvider',function ($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
}])

app.run(['ngNotify', function (ngNotify) {
  ngNotify.config({
    theme: 'pure',
    position: 'top',
    duration: 200000,
    type: 'info'
  });

}])

app.controller("LandingCtrl", ["$scope", "$http", "Validate", "ngNotify", "$location", function ($scope, $http, Validate, ngNotify, $location) {
  var ctrl = this;

  $http.defaults.headers.common['X-CSRF-Token'] = document.querySelector('[name="csrf-token"]').content;

  ctrl.signIn = function (form, $event) {
    $http.post('/users/sign_in', form).then(function (res) {
      window.location = "/search/map"
    }, function (res) {
      ngNotify.set(res.data.msg, 'error');
      ctrl.invalidEmail = true;
    })
    $event.preventDefault();
  }

  ctrl.signUp = function (form, $event) {
    $http.post('/users', form).then(function (res) {
      window.location = "/search/map"
    }, function (res) {
      ctrl.invalidEmail = true;
      Validate("user", res.data.errors)
      ngNotify.set(res.data.msg, 'error');
    })

    $event.preventDefault();
  }

  ctrl.reset = function (form) {
    $http.post('/users/password', form).then(function (res) {
      ngNotify.set(res.data.msg, 'success');
    }, function (res) {
      ngNotify.set(res.data.msg, 'error');
    })
  }

  ctrl.set_password = function (form, $event) {
    if (form) {
      var form = form;
    } else {
      var form = {
        user: {
          password: "",
          password_confirmation: "",
        }
      }
    }

    form.user.reset_password_token = $location.search().reset_password_token;
    $http.put('/users/password', form).then(function (res) {
      window.location = "/search/map"
    }, function (res) {
      ngNotify.set(res.data.msg, 'error');
    })
    $event.preventDefault();
  }
}])

//= require oxymoron/angular
//= require oxymoron/angular-resource
//= require oxymoron/angular-animate
//= require oxymoron/angular-aria
//= require oxymoron/angular-touch
//= require oxymoron/angular-ui-router
//= require oxymoron/underscore
//= require oxymoron/ng-notify
//= require oxymoron/perfect-scrollbar
//= require oxymoron/store
//= require oxymoron
//= require dcbox
//= require angular-material
//= require_self
//= require_tree .

var app = angular.module('app', ['ui.router', 'oxymoron', 'ngMaterial', 'ngTouch'])

app.run(['$rootScope', 'Sign', '$mdDialog', 'Cache', function ($rootScope, Sign, $mdDialog, Cache) {
  $rootScope._ = _;
  $rootScope.gon = gon;
  $rootScope.Sign = Sign;
  $rootScope.Routes = Routes;
}])

app.run([function(){
  gon.data.by_index = {
    options: _.indexBy(gon.data.options, 'id'),
    trade_types: _.indexBy(gon.data.trade_types, 'id'),
    currencies: _.indexBy(gon.data.currencies, 'id'),
    weight_dimensions: _.indexBy(gon.data.weight_dimensions, 'id'),
  }
}])
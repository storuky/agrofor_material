//= require private_pub
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
//= require flickity.pkgd.min
//= require angular-material
//= require_self
//= require_tree .

var app = angular.module('app', ['ui.router', 'oxymoron', 'ngMaterial', 'ngTouch'])

app.run(['$rootScope', 'Sign', '$mdDialog', 'Cache', 'Counter', function ($rootScope, Sign, $mdDialog, Cache, Counter) {
  $rootScope._ = _;
  $rootScope.gon = gon;
  $rootScope.Sign = Sign;
  $rootScope.Routes = Routes;
  $rootScope.Counter = Counter;

  if (gon.current_user)
    Counter.update();

  $rootScope.edit_path = function (position) {
    if (position) {
      var hash = "{id: "+position.id+"}"
      return "edit_"+position.type.toLowerCase()+"_path("+hash+")"
    }

    return "";
  }

  $rootScope.show_path = function (position) {
    if (position)
      return "/search/map?type=" + position.type.toLowerCase() + "&id=" + position.id
    return ""
  }

  $rootScope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
          if(fn && (typeof(fn) === 'function')) {
              fn();
          }
      } else {
          this.$apply(fn);
      }
  };
}])

app.run([function(){
  gon.data.by_index = {
    options: _.indexBy(gon.data.options, 'id'),
    trade_types: _.indexBy(gon.data.trade_types, 'id'),
    currencies: _.indexBy(gon.data.currencies, 'id'),
    weight_dimensions: _.indexBy(gon.data.weight_dimensions, 'id'),
  }
}])
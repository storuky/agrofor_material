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
//= require_tree ./agrofor

var app = angular.module('app', ['ui.router', 'oxymoron', 'ngMaterial', 'ngTouch'])

app.run(['$rootScope', 'Sign', '$mdDialog', 'Cache', 'Counter', '$state', 'Position', 'Offer', 'Template', 'Ws', '$timeout', function ($rootScope, Sign, $mdDialog, Cache, Counter, $state, Position, Offer, Template, Ws, $timeout) {
  $rootScope._ = _;
  $rootScope.gon = gon;
  $rootScope.Sign = Sign;
  $rootScope.Routes = Routes;
  $rootScope.Counter = Counter;

  $rootScope.Position = Position;
  $rootScope.Offer = Offer;
  $rootScope.Template = Template;

  Ws.connect();
  
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

  $rootScope.is_position_form_path = function () {
    return ['new_position_path', 'edit_position_path', 'new_offer_path', 'edit_offer_path', 'edit_template_path'].indexOf($state.current.name)!=-1
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

  $rootScope.$watch(function () {
    return $state.current.name
  }, function () {
    $rootScope.show_background = false;

    $timeout(function () {
      $rootScope.show_background = true;
    })
  })
}])

app.run([function(){
  gon.data.by_index = {
    options: _.indexBy(gon.data.options, 'id'),
    trade_types: _.indexBy(gon.data.trade_types, 'id'),
    currencies: _.indexBy(gon.data.currencies, 'id'),
    weight_dimensions: _.indexBy(gon.data.weight_dimensions, 'id'),
  }
}])

app.run(['Currency', '$interval', function (Currency, $interval) {
  Currency.update_rates()
  
  $interval(function () {
    Currency.update_rates()
  }, 1000 * 60 * 60)
}])
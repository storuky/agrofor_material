app.controller('PositionsCtrl', ['$scope', 'action', 'Position', 'Cache', '$timeout', '$mdDialog', '$location', 'Sign', '$state', '$location',
                        function ($scope, action, Position, Cache, $timeout, $mdDialog, $location, Sign, $state, $location) {
  
  var ctrl = this;
  
  $scope.gon = gon;
  $scope.Position = Position;

  action(['new', 'edit', 'index'], function () {
    if (!gon.current_user) {
      $state.go('map_path');
      Sign.isShow = true;
    }

  })

  action('index', function () {
    $scope.Cache = Cache;

    ctrl.limitTo = 5;

    Position.query(function (res) {
      Cache.set('positions', res)
    });
  })


  action('new', function () {
    ctrl.save = Position.create;
    ctrl.position = Position.new({suitable: $location.search().suitable});
    ctrl.templates = [{title: "lol", id: 1},{title: "lal", id: 2},]
  })

  action('edit', function (params) {
    ctrl.position = Position.edit({id: params.id});
    ctrl.save = Position.update;
  })

  action('cluster', function (positions) {
    ctrl.close = function () {
      $mdDialog.cancel();

      $location.search('ids', undefined);
    }

    ctrl.goTo = function (position) {
      var ids = $location.search().ids;
      ctrl.close();
      Position.openModal(position.id, ids)
    }
    
    ctrl.positions = positions;
  })


  action('modal', function (position, callback) {
    ctrl.close = function () {
      $mdDialog.cancel();
      $location.search('id', undefined);
      callback();
    }

    ctrl.position = position;

    ctrl.goTo = function (position) {
      Position.openModal(position.id)
    }


    if (gon.current_user && gon.current_user.id!=ctrl.position.user_id) {
      Position.offers({id: ctrl.position.id}, function (res) {
        ctrl.offers = res;
        if (ctrl.suitable_positions) updateSuitablePositions();
      })

      Position.suitable({id: ctrl.position.id}, function (res) {
        ctrl.suitable_positions = res;
        if (ctrl.offers) updateSuitablePositions();
      })

      ctrl.send_offer = function (offer) {
        Position.send_offer({offer_id: offer.id, id: ctrl.position.id}, function () {
          ctrl.offers.unshift(offer);
          updateSuitablePositions();
        })
      }

      function updateSuitablePositions () {
        var offer_ids = _.pluck(ctrl.offers, "id");
        ctrl.suitable_positions = _.select(ctrl.suitable_positions, function (position) {
          return !_.contains(offer_ids, position.id)
        })
      }
    }

    // $scope.$watch('ctrl.position.price_weight_dimension_id', function (wd) {
    //   if (wd!==undefined) {
    //     ctrl.position.price = (ctrl.position.price_etalon * gon.data.by_index.weight_dimensions[wd].convert).toFixed(2);
    //   }
    // })

    // $scope.$watch('ctrl.position.weight_dimension_id', function (wd) {
    //   if (wd!==undefined) {
    //     ctrl.position.weight = (ctrl.position.weight_etalon / gon.data.by_index.weight_dimensions[wd].convert).toFixed(2);
    //   }
    // })

    // $scope.$watch('ctrl.position.weight_min_dimension_id', function (wd) {
    //   if (wd!==undefined) {
    //     ctrl.position.weight_min = (ctrl.position.weight_min_etalon / gon.data.by_index.weight_dimensions[wd].convert).toFixed(2);
    //   }
    // })
  })
}])
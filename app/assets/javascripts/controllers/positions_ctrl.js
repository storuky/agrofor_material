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

    var positions = _.select(ctrl.positions, function (position) {
      return gon.current_user.id != position.user_id
    })

    if (positions.length) {
      var id = _.pluck(positions, 'id')
      Position.suitable({id: id}, function (res) {
        ctrl.suitable_positions = res;
      })
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
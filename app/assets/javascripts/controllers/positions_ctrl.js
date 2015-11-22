app.controller('PositionsCtrl', ['$scope', '$stateParams', 'action', 'Position', 'Cache', '$timeout', '$mdDialog', '$location', function ($scope, $stateParams, action, Position, Cache, $timeout, $mdDialog, $location) {
  var ctrl = this;


  action('index', function () {
    $scope.Cache = Cache;

    ctrl.limitTo = 5;

    Position.query(function (res) {
      Cache.set('positions', res)
    });

  })

  action('new', function () {
    ctrl.save = Position.create;
  })

  action('edit', function () {
    ctrl.position = Position.edit({id: $stateParams.id})
    ctrl.save = Position.update;
  })

  action('modal', function (position) {
    $scope.gon = gon;
    ctrl.close = function () {
      $mdDialog.cancel();

      $location.search('id', undefined);
    }

    ctrl.position = position;

    $scope.$watch('ctrl.position.price_weight_dimension_id', function (wd) {
      if (wd!==undefined) {
        ctrl.position.price = ctrl.position.price_etalon * gon.data.by_index.weight_dimensions[wd].convert;
      }
    })

    $scope.$watch('ctrl.position.weight_dimension_id', function (wd) {
      if (wd!==undefined) {
        ctrl.position.weight = ctrl.position.weight_etalon / gon.data.by_index.weight_dimensions[wd].convert;
      }
    })

    $scope.$watch('ctrl.position.weight_min_dimension_id', function (wd) {
      if (wd!==undefined) {
        ctrl.position.weight_min = ctrl.position.weight_min_etalon / gon.data.by_index.weight_dimensions[wd].convert;
      }
    })
  })
}])
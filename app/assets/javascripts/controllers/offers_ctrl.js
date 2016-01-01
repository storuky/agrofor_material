app.controller('OffersCtrl', ['$scope', 'action', 'Offer', 'Cache', '$location', 'Position', function ($scope, action, Offer, Cache, $location, Position) {
  var ctrl = this;

  ctrl.goTo = function (position) {
    Position.goTo(position)
  }

  action('index', function () {
    $scope.Cache = Cache;

    ctrl.limitTo = 5;

    Offer.query(function (res) {
      Cache.set('offers', res)
    });
  })

  action('edit', function (params) {
    Offer.get({id: params['id']}, function (res) {
      ctrl.position = res;
      $scope.suitable = ctrl.position.position_id;
    })

    ctrl.save = function (form) {
      Offer.update({form_name: 'position', id: ctrl.position.id, offer: ctrl.position, suitable: $scope.suitable}, function (res) {
        ctrl.goTo({id: $scope.suitable, suitable: $scope.suitable})
      })
    }
  })

  action('new', function (params) {
    $scope.suitable = $location.search().suitable;
    ctrl.position = Offer.new({suitable: $scope.suitable});

    ctrl.save = function (form) {
      Offer.create({form_name: 'position', offer: ctrl.position, suitable: $scope.suitable}, function (res) {
        ctrl.goTo({id: $scope.suitable, suitable: $scope.suitable})
      })
    }
  })
}])
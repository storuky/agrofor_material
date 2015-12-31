app.controller('OffersCtrl', ['$scope', 'action', 'Offer', 'Cache', function ($scope, action, Offer, Cache) {
  var ctrl = this;

  action('index', function () {
    $scope.Cache = Cache;

    ctrl.limitTo = 5;

    Offer.query(function (res) {
      Cache.set('offers', res)
    });
  })
}])
app.service('Currency', ['$http', function ($http) {
  var Currency = this;
  Currency.update_user_currency = function () {
    $http.get(Routes.user_currency_path())
      .then(function (res) {
        gon.settings.currency = res.data;
      })
  }
}])
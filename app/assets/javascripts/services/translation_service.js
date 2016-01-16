app.service('Translation', ['$http', function ($http) {
  var Translation = this;

  Translation.update = function () {
    $http.get(Routes.translations_path())
      .then(function (res) {
        gon.settings.locale = res.data.locale;
        gon.translations = res.data.translations;
        angular.extend(gon.data, res.data.data);

        gon.data.by_index = {
          options: _.indexBy(gon.data.options, 'id'),
          trade_types: _.indexBy(gon.data.trade_types, 'id'),
          currencies: _.indexBy(gon.data.currencies, 'id'),
          weight_dimensions: _.indexBy(gon.data.weight_dimensions, 'id'),
        }
      })
  }
}])
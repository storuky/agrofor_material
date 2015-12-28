app.service('Search', ['$rootScope', '$http', 'ngNotify', function ($rootScope, $http, ngNotify) {
  var Search = this;

  Search.tags = [];

  var searchCallback = function (res) {
    if (Search.type == 'map') {
      Search.positions = res.data;
    }
  }

  Search.byParams = function () {
    var params = {
      tags: Search.tags,
      query: Search.query
    }
    $http.get(Routes[Search.type + "_path"]({format: "json"}), {params: params})
      .then(searchCallback)
  }

  Search.suitable = function () {
    var params = {};

    $http.get(Routes.suitable_path({format: 'json'}), {params: params})
      .success(searchCallback)
  }

  Search.addTag = function (params) {
    if (!params.option || !params.option.id) {
      ngNotify.set('Укажите категорию', 'error');
      return false;
    }

    var tag = angular.copy(params);
    tag.option_id = tag.option.id;
    if (tag.id !== undefined) {
      Search.tags[tag.id] = tag;
    } else {
      tag.id = Search.tags.length;
      Search.tags.push(tag);
    }

    Search.showExtended = false;
    Search.resetForm();
  }

  Search.setActiveTag = function (tag) {
    Search.form = _.clone(tag);
    Search.showExtended = true;
  }

  Search.resetForm = function () {
    Search.form = {
      currency_id: gon.settings.currency.id,
      weight_from_dimension_id: gon.data.weight_dimensions[0].id,
      weight_to_dimension_id: gon.data.weight_dimensions[0].id,
      price_from_weight_dimension_id: gon.data.weight_dimensions[0].id,
      price_to_weight_dimension_id: gon.data.weight_dimensions[0].id
    }
  }
  
  Search.resetForm();
}])
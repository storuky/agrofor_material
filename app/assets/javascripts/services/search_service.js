app.service('Search', ['$rootScope', '$http', 'ngNotify', function ($rootScope, $http, ngNotify) {
  var Search = this;

  Search.tags = [];
  Search.positions = {};
  Search.tab = 'params';
  Search.order = 'created_at DESC';



  var searchCallback = function (res) {
    if (res.data.offset) {
      _.each(res.data.collection, function (position) {
        Search.positions.collection.push(position);
      })
    } else {
      Search.positions = res.data;
    }
  }

  Search.byParams = function (offset) {
    var params = {
      tags: Search.tags,
      query: Search.query,
      offset: Search.offset,
      order: Search.order
    }
    
    Search.all = !Search.tags.length && !Search.query;

    Search.promise = $http.get(Routes[Search.type + "_path"]({format: "json"}), {params: params})
      .then(searchCallback)
  }

  Search.suitable = function () {
    var params = {};

    $http.get(Routes.suitable_path({format: 'json'}), {params: params})
      .success(searchCallback)
  }

  Search.addTag = function (params) {
    var tag = angular.copy(params);

    if (Search.tab == 'params') {
      if (tag.option)
        tag.option_id = tag.option.id;

      if (!params.option || !params.option.id) {
        ngNotify.set('Укажите категорию', 'error');
        return false;
      }
    } else if (Search.tab == 'suitable') {
      if (!params.checked_positions_ids || !params.checked_positions_ids.length) {
        ngNotify.set('Выберите хотя бы одну позицию', 'error');
        return false;
      }
    }

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
    Search.form = angular.copy(tag);
    if (Search.form.checked_positions_ids) {
      Search.tab = "suitable";
    } else {
      Search.tab = "params";
    }
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
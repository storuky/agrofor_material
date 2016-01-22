app.factory('serializerInterceptor', [function() {  
  var self = this;

  self.PositionSerializer = function (position_fields) {
    if (!position_fields)
      return null;

    return {
      id: position_fields[0],
      lat: position_fields[1],
      lng: position_fields[2],
      trade_type: gon.data.by_index.trade_types[position_fields[3]],
      option: gon.data.by_index.options[position_fields[4]],
      weight: position_fields[5],
      weight_dimension: gon.data.by_index.weight_dimensions[position_fields[6]],
      price: position_fields[7],
      currency: gon.data.by_index.currencies[position_fields[8]],
      price_weight_dimension: gon.data.by_index.weight_dimensions[position_fields[9]],
      weight_min: position_fields[10],
      weight_min_dimension: gon.data.by_index.weight_dimensions[position_fields[11]],
      created_at: position_fields[12],
      type: position_fields[13],
      images: position_fields[14],
      documents: position_fields[15],
      status: position_fields[16]
    }
  }

  var interceptor = {
    request: function(config) {
      return config;
    },
    response: function(response) {
      if (response.data.serializer) {
        response.data.resource = self[response.data.serializer](response.data.resource);
      }

      if (response.data.each_serializer) {
        response.data.collection = _.map(response.data.collection, function (element) {
          return self[response.data.each_serializer](element);
        })
      }
      return response;
    }
  };
  return interceptor;
}]);

app.config(['$httpProvider', function($httpProvider) {  
  $httpProvider.interceptors.push('serializerInterceptor');
}]);

function executeFunctionByName(functionName, context /*, args */) {
  var args = [].slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}
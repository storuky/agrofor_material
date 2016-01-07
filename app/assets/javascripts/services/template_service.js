app.run(['Template', function (Template) {
  Template.serialize = function (position_fields) {
    return {
      id: position_fields[0],
      lat: position_fields[1],
      lng: position_fields[2],
      trade_type: gon.data.by_index.trade_types[position_fields[3]],
      trade_type_id: position_fields[3],
      option: gon.data.by_index.options[position_fields[4]],
      option_id: position_fields[4],
      weight: position_fields[5],
      weight_dimension: gon.data.by_index.weight_dimensions[position_fields[6]],
      weight_dimension_id: position_fields[6],
      price: position_fields[7],
      price_weight_dimension: gon.data.by_index.weight_dimensions[position_fields[9]],
      price_weight_dimension_id: position_fields[9],
      weight_min: position_fields[10],
      weight_min_dimension: gon.data.by_index.weight_dimensions[position_fields[11]],
      weight_min_dimension_id: position_fields[11],
      created_at: position_fields[12],
      type: position_fields[13],
      additional: position_fields[14],
      price_discount: position_fields[15],
      address: position_fields[16]
    }
  }
}])
class Position < PositionBase
  has_many :offers

  after_commit :regenerate_cache

  def to_offer
    Offer.new self.attributes.except("type", "id", "created_at", "updated_at", "delta").update(position_id: id)
  end


  def contractor options = {}
    trade_type_contractor = {
      1 => 2,
      2 => 1
    }

    Position.new({
      trade_type_id: trade_type_contractor[trade_type_id],
      weight: weight,
      price: price * self.currency.get_rate(options[:currency].name),
      weight_dimension: weight_dimension,
      price_weight_dimension: price_weight_dimension,
      option_id: option_id,
      weight_min: weight_min,
      weight_min_dimension: weight_min_dimension,
    })
  end


  class << self
    def pluck_fields
      self.distinct.pluck(:id, :lat, :lng, :trade_type_id, :option_id, :weight, :weight_dimension_id, :price, :currency_id, :price_weight_dimension_id)
    end

    def pluck_all_fields
      Rails.cache.fetch('Position.pluck_all_fields') do
        self.pluck_fields
      end
    end

    def look_for query = nil
      if query.try(:present?)
        ids = Position.search_for_ids query
        Position.where(id: ids)
      else
        Position
      end
    end

    def statuses
      Position.aasm.states.each_with_index.map do |state, index|
        {id: index, name: state.name, title: I18n.t('position.status.'+state.name.to_s)}
      end
    end

    def filter filters = []
      currencies = Currency.all_from_cache
      sql = []
      filters.each do |filter|
        user_currency = Currency.all_by_index_from_cache(serializer: CurrencySerializer)[filter[:currency_id]]
        
        query = {}
        query[:trade_type_id] = filter["trade_type_id"] if filter["trade_type_id"]
        query[:option_id] = filter["option_id"] if filter["option_id"]

        wd_cache = WeightDimension.all_by_index_from_cache(serializer: WeightDimensionSerializer)
        
        if filter["weight_from"] or filter["weight_to"]
          weight_from = (filter["weight_from"] || 0).to_f * wd_cache[filter["weight_from_dimension_id"].to_i][:convert] rescue 0
          weight_to = (filter["weight_to"] || Float::INFINITY).to_f * wd_cache[filter["weight_to_dimension_id"].to_i][:convert] rescue Float::INFINITY
          query[:weight_etalon] = (weight_from..weight_to)
        end

        if filter["price_from"] or filter["price_to"]
          price_from = (filter["price_from"] || 0).to_f / wd_cache[filter["price_from_weight_dimension_id"].to_i][:convert] rescue 0
          price_to = (filter["price_to"] || Float::INFINITY).to_f / wd_cache[filter["price_to_weight_dimension_id"].to_i][:convert] rescue Float::INFINITY

          price_sql = []
          currencies.each do |currency|
            converted_price_from = price_from / currency.get_rate(user_currency[:name])
            converted_price_to = price_to / currency.get_rate(user_currency[:name])
            position = Position.where currency_id: currency.id, price_etalon: (converted_price_from..converted_price_to)

            price_sql << position.to_sql.split("WHERE")[1]
          end

          price_sql = "(" + price_sql.join(" OR ") + ")"
        end

        in_radius_sql = ""
        if filter["coords"]
          lat = filter["coords"][0]
          lng = filter["coords"][1]
          # bounded_by = filter["bounded_by"].values
          
          # default_radius = Position.measure(bounded_by[0][0].to_f, bounded_by[0][1].to_f, bounded_by[1][0].to_f, bounded_by[0][1].to_f)/2
          
          radius_of_earth = 6378137
          
          radius = filter["radius"].present? ? filter["default_radius"].to_f + (filter["radius"].to_f * 1000) : filter["default_radius"].to_f

          a = "SIN((positions.lat-#{lat})*PI()/360)  *  SIN((positions.lat-#{lat})*PI()/360)  +  COS(#{lat}*PI()/180) * COS(positions.lat*PI()/180) * SIN((positions.lng-#{lng})*PI()/360) * SIN((positions.lng-#{lng})*PI()/360)"
          in_radius_sql = %{
            #{radius} >= 2 * ATAN2(SQRT(#{a}), SQRT(1-#{a})) * #{radius_of_earth}
          }
        end

        sql << self.where(query).where(price_sql).where(in_radius_sql).to_sql.split("WHERE")[1]
      end
      self.where sql.join(" OR ")

    end

    def find_suitable positions
      filters = [positions].flatten.map do |position|
        res = {
          option_id: position.option_id,
          weight_from: position.weight_min,
          weight_from_dimension_id: position.weight_min_dimension_id,
          currency_id: position.currency_id
        }

        res[:trade_type_id] = TradeType.all_by_index_from_cache[position.trade_type_id].trade_type_id

        if position.trade_type_id == 1
          res[:price_to] = position.price * (1 + position.price_discount/100.0)
          res[:price_to_weight_dimension_id] = position.price_weight_dimension_id
        elsif position.trade_type_id == 2
          res[:price_from] = position.price * (1 - position.price_discount/100.0)
          res[:price_from_weight_dimension_id] = position.price_weight_dimension_id
        end
        res.with_indifferent_access
      end

      self.filter filters
    end
  end

  private
    def regenerate_cache
      Rails.cache.delete_matched(/User\.positions_from_cache\(#{self.user_id}\,/)
      Rails.cache.delete("Position.pluck_all_fields")
    end
    
end

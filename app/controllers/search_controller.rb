class SearchController < ApplicationController
  before_action :set_search_result, only: [:map, :list]

  def map
    respond_to do |format|
      format.html
      format.json {
        result = if @positions.class == Class
          @positions.pluck_all_fields
        else
          @positions.distinct.pluck_fields
        end
        render json: Oj.dump(result)
      }
    end
  end

  def list
    respond_to do |format|
      format.html
      format.json {
        offset = params[:offset].to_i

        if params[:order] == 'price' 
          order = 'position_bases.price_etalon * currencies.to_usd'
        elsif params[:order] == 'price DESC'
          order = 'position_bases.price_etalon * currencies.to_usd DESC'
        else
          if Position.accept_for_order.include?(params[:order])
            order = "position_bases.#{params[:order]}"
          end
        end

        if current_user
          collection = @positions.joins("LEFT JOIN favorite_positions ON (position_bases.id=favorite_positions.position_id AND favorite_positions.user_id=#{current_user.id})").order("favorite_positions.position_id")
        else
          collection = @positions
        end

        collection = collection.order(order).offset(offset).limit(10)
        
        result = {
          offset: offset,
          collection: collection.pluck_fields([:updated_at, :type]),
        }
        render json: Oj.dump(result)
      }
    end
  end

  private
    def set_search_result
      @positions = PositionBase.look_for(params[:query])
      
      tags = params[:tags].try(:values)
      if tags.try(:any?)
        @positions = @positions.filter tags
      end
    end
end

class SearchController < ApplicationController
  before_action :set_search_result, only: [:map, :list]

  def map
    respond_to do |format|
      format.html
      format.json {
        result = if @positions.class == Class
          @positions.distinct.pluck_all_fields
        else
          @positions.distinct.pluck_fields
        end
        render json: Oj.dump({collection: result})
      }
    end
  end

  def list
    respond_to do |format|
      format.html
      format.json {
        offset = params[:offset].to_i

        collection = order_positions(@positions).offset(offset).limit(10)
        
        result = {
          offset: offset,
          collection: collection.pluck_fields.uniq,
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

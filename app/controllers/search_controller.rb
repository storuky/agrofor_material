class SearchController < ApplicationController
  before_action :set_search_result, only: [:map, :list]

  def map
    respond_to do |format|
      format.html
      format.json {
        result = if @positions.class == Class
          @positions.pluck_all_fields
        else
          @positions.pluck_fields
        end
        render json: Oj.dump(result)
      }
    end
  end

  def list
    respond_to do |format|
      format.html
      format.json {
        collection = @positions.joins("LEFT JOIN favorite_positions ON (position_bases.id=favorite_positions.position_id AND favorite_positions.user_id=#{current_user.id})").order("favorite_positions.position_id").order("updated_at DESC")
        result = {
          collection: serialize(collection.limit(10)),
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

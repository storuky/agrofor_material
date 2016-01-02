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
        @positions = serialize(@positions.limit(10))
        render json: Oj.dump(@positions)
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

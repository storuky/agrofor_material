class SearchController < ApplicationController
  def map
    respond_to do |format|
      format.html
      format.json {
        render json: MultiJson.dump(Position.pluck_fields)
      }
    end
  end

  def list
    respond_to do |format|
      format.html
      format.json {
        render json: Position.all
      }
    end
  end
end

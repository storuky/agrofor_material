class SearchController < ApplicationController
  def map
    respond_to do |format|
      format.html
      format.json {
        render json: Oj.dump(Position.pluck_fields)
      }
    end
  end

  def list
    respond_to do |format|
      format.html
      format.json {
        @positions = Position.all_from_cache(serializer: PublicationSerializer)
        render json: Oj.dump(@positions)
      }
    end
  end
end

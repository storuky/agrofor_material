class PositionsController < ApplicationController
  before_action :check_user, except: [:show]
  before_action :set_position, only: [:show, :destroy, :update, :edit]
  before_action :check_owner, only: [:destroy, :update, :edit]

  def index
    respond_to do |format|
      format.html
      format.json {
        @positions = Position.all_from_cache(serializer: PositionSerializer)
        render json: Oj.dump(@positions)
      }
    end
  end

  def new

  end

  def edit
    respond_to do |format|
      format.html
      format.json {
        render json: Oj.dump(@position)
      }
    end
  end

  def destroy

  end

  def create
    respond_to do |format|
      format.json {
        @position = current_user.positions.new position_params
        if @position.save
          render json: {msg: "Позиция успешно создана"}
        else
          render json: {errors: @position.errors}, status: 422
        end
      }
    end
  end

  def update

  end

  def show
    respond_to do |format|
      format.json {
        render json: Oj.dump(@position)
      }
    end
  end

  private
    def set_position
      @position = Position.find_from_cache(params[:id], serializer: PositionSerializer)
    end

    def check_owner
      if @position[:user_id] != current_user.id
        render json: {msg: "Позиция не найдена", redirect_to: "positions_path"}, status: 404
      end
    end

    def position_params
      params.require(:position).permit(
        :title,
        :description,
        :weight,
        :weight_min,
        :price,
        :price_discount,
        :address,
        :trade_type_id,
        :currency_id,
        :price_weight_dimension_id,
        :weight_dimension_id,
        :weight_min_dimension_id,
        :lat,
        :lng
      ).merge({
        option_id: (params[:position][:option][:id] rescue nil)
      })
    end
end

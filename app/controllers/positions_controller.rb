class PositionsController < ApplicationController
  before_action :check_user
  before_action :set_position, only: [:destroy, :update, :edit]

  def index
    respond_to do |format|
      format.html
      format.json {
        @positions = Position.all
        render json: @positions, root: false
      }
    end
  end

  def new

  end

  def edit
    respond_to do |format|
      format.html
      format.json {
        render json: @position, root: false
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
        @position = Position.find(params[:id])
        render json: @position
      }
    end
  end

  private
    def set_position
      @position = current_user.positions.find_by(id: params[:id])

      unless @position
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
